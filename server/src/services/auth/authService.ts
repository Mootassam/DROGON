import UserRepository from "../../database/repositories/userRepository";
import Error400 from "../../errors/Error400";
import bcrypt from "bcrypt";
import EmailSender from "../../services/emailSender";
import jwt from "jsonwebtoken";
import TenantUserRepository from "../../database/repositories/tenantUserRepository";
import MongooseRepository from "../../database/repositories/mongooseRepository";
import TenantService from "../tenantService";
import TenantRepository from "../../database/repositories/tenantRepository";
import { tenantSubdomain } from "../tenantSubdomain";
import Error401 from "../../errors/Error401";
import moment from "moment";
import AssetRepository from "../../database/repositories/assetsRepository";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import { getConfig } from '../../config';

const nonces = new Map();
const BCRYPT_SALT_ROUNDS = 12;

class AuthService {
  static async signupMobile(
    email,
    password,
    phoneNumber,
    invitationToken,
    tenantId,
    options: any = {},
    req,
    accountType: "real" | "demo" = "real"
  ) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      email = email.toLowerCase();
      const existingUser = await UserRepository.findByEmail(email, options);
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

      if (existingUser) {
        const existingPassword = await UserRepository.findPassword(
          existingUser.id,
          options
        );

        if (existingPassword) {
          throw new Error400(options.language, "auth.emailAlreadyInUse");
        }

        await UserRepository.updatePassword(
          existingUser.id,
          hashedPassword,
          false,
          {
            ...options,
            session,
            bypassPermissionValidation: true,
          }
        );

        await this.handleOnboardMobile(
          existingUser,
          invitationToken,
          tenantId,
          {
            ...options,
            session,
          }
        );

        const isEmailVerified = Boolean(
          await UserRepository.count(
            {
              emailVerified: true,
              _id: existingUser.id,
            },
            {
              ...options,
              session,
            }
          )
        );

        if (!isEmailVerified && EmailSender.isConfigured) {
          await this.sendEmailAddressVerificationEmail(
            options.language,
            existingUser.email,
            tenantId,
            {
              ...options,
              session,
              bypassPermissionValidation: true,
            }
          );
        }

        const token = jwt.sign(
          { 
            id: existingUser.id,
            accountType: existingUser.accountType || "real"
          },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
        );

        await MongooseRepository.commitTransaction(session);
        return token;
      }

      const newUser = await UserRepository.createFromAuthMobile(
        {
          firstName: email.split("@")[0],
          password: hashedPassword,
          email: email,
          phoneNumber: phoneNumber,
          accountType,
          req,
        },
        {
          ...options,
          session,
        }
      );

      await AssetRepository.createDefaultAssets(
        newUser,
        tenantId,
        options,
        accountType === "demo" ? 2000 : 0
      );

      await this.handleOnboardMobile(newUser, invitationToken, tenantId, {
        ...options,
        session,
      });

      const isEmailVerified = Boolean(
        await UserRepository.count(
          {
            emailVerified: true,
            _id: newUser.id,
          },
          {
            ...options,
            session,
          }
        )
      );

      if (!isEmailVerified && EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          options.language,
          newUser.email,
          tenantId,
          {
            ...options,
            session,
            bypassPermissionValidation: true,
          }
        );
      }

      const token = jwt.sign(
        { 
          id: newUser.id,
          accountType: newUser.accountType || accountType
        },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
      );

      await MongooseRepository.commitTransaction(session);
      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async signupDemo(tenantId, options: any = {}, req) {
    // Generate short random suffix (6 chars) and take last 3 for display
    const randomSuffix = Math.random().toString(36).substring(2, 8); // 6 chars
    const shortId = randomSuffix.substring(randomSuffix.length - 3); // last 3 chars
    const email = `demo_...${shortId}@demo.local`;

    // Generate secure random password (not used but required)
    const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const phoneNumber = "";

    return this.signupMobile(
      email,
      password,
      phoneNumber,
      null,
      tenantId,
      { ...options, bypassPermissionValidation: true },
      req,
      "demo"
    );
  }

  static async addressNonce(address) {
    const nonce = uuidv4();
    nonces.set(address.toLowerCase(), nonce);
    return { nonce };
  }

  static async signWithWallet(req, options) {
    const { address, signature, message, invitationToken, tenantId } = req.body;

    if (!address || !signature || !message) {
      throw new Error400(options.language, "errors.missingRequiredFields");
    }

    const normalizedAddress = address.toLowerCase();
    const session = await MongooseRepository.createSession(options.database);

    try {
      const savedNonce = nonces.get(normalizedAddress);
      if (!savedNonce || !message.includes(savedNonce)) {
        throw new Error400(options.language, "errors.invalidNonce");
      }

      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== normalizedAddress) {
        throw new Error400(options.language, "errors.invalidSignature");
      }

      nonces.delete(normalizedAddress);

      let user = await UserRepository.findUserByEmail(normalizedAddress, req);
      let token;

      if (!user) {
        user = await UserRepository.createFromWallet(
          req,
          { address: normalizedAddress },
          {
            ...options,
            session,
          }
        );

        await AssetRepository.createDefaultAssets(user, tenantId, options);

        await this.handleOnboardMobile(user, invitationToken, tenantId, {
          ...options,
          session,
        });
      }

      token = jwt.sign(
        { 
          id: user.id,
          accountType: user.accountType || "real",
          address: normalizedAddress 
        }, 
        getConfig().AUTH_JWT_SECRET, 
        {
          expiresIn: getConfig().AUTH_JWT_EXPIRES_IN,
        }
      );

      await MongooseRepository.commitTransaction(session);
      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      if (error instanceof Error400) {
        throw error;
      }
      console.error('Wallet sign error:', error);
      throw new Error400(options.language, "errors.walletSignFailed");
    }
  }

  static async signup(
    email,
    password,
    username,
    phoneNumber,
    withdrawPassword,
    invitationcode,
    invitationToken,
    tenantId,
    options: any = {},
    req
  ) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      email = email.toLowerCase();
      const existingUser = await UserRepository.findByEmail(email, options);

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

      if (existingUser) {
        const existingPassword = await UserRepository.findPassword(
          existingUser.id,
          options
        );

        if (existingPassword) {
          throw new Error400(options.language, "auth.emailAlreadyInUse");
        }

        await UserRepository.updatePassword(
          existingUser.id,
          hashedPassword,
          false,
          {
            ...options,
            session,
            bypassPermissionValidation: true,
          }
        );

        await this.handleOnboard(existingUser, invitationToken, tenantId, {
          ...options,
          session,
        });

        const isEmailVerified = Boolean(
          await UserRepository.count(
            {
              emailVerified: true,
              _id: existingUser.id,
            },
            {
              ...options,
              session,
            }
          )
        );

        if (!isEmailVerified && EmailSender.isConfigured) {
          await this.sendEmailAddressVerificationEmail(
            options.language,
            existingUser.email,
            tenantId,
            {
              ...options,
              session,
              bypassPermissionValidation: true,
            }
          );
        }

        const token = jwt.sign(
          { id: existingUser.id, accountType: existingUser.accountType || "real" },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
        );

        await MongooseRepository.commitTransaction(session);
        return token;
      }

      const newUser = await UserRepository.createFromAuth(
        {
          firstName: email.split("@")[0],
          password: hashedPassword,
          email: email,
          username: username,
          phoneNumber: phoneNumber,
          withdrawPassword: withdrawPassword,
          req,
        },
        {
          ...options,
          session,
        }
      );

      await this.handleOnboard(newUser, invitationToken, tenantId, {
        ...options,
        session,
      });

      const isEmailVerified = Boolean(
        await UserRepository.count(
          {
            emailVerified: true,
            _id: newUser.id,
          },
          {
            ...options,
            session,
          }
        )
      );

      if (!isEmailVerified && EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          options.language,
          newUser.email,
          tenantId,
          {
            ...options,
            session,
          }
        );
      }

      const token = jwt.sign(
        { id: newUser.id, accountType: newUser.accountType || "real" },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
      );

      await MongooseRepository.commitTransaction(session);
      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async resetPassword(userId, newPassword, options) {
    const newHashedPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_SALT_ROUNDS
    );

    return UserRepository.updatePassword(
      userId,
      newHashedPassword,
      true,
      options
    );
  }

  static async findByEmail(email, options: any = {}) {
    email = email.toLowerCase();
    return UserRepository.findByEmail(email, options);
  }

  static async signin(
    email,
    password,
    invitationToken,
    tenantId,
    options: any = {},
    req,
  ) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      email = email.toLowerCase();
      const user = await UserRepository.findByEmail(email, options);

      if (!user) {
        throw new Error400(options.language, "auth.userNotFound");
      }

      const currentPassword = await UserRepository.findPassword(
        user.id,
        options
      );

      if (!currentPassword) {
        throw new Error400(options.language, "auth.wrongPassword");
      }

      const passwordsMatch = await bcrypt.compare(password, currentPassword);

      if (!passwordsMatch) {
        throw new Error400(options.language, "auth.wrongPassword");
      }

      await this.handleOnboard(user, invitationToken, tenantId, {
        ...options,
        currentUser: user,
        session,
      });

      const token = jwt.sign(
        { id: user.id, accountType: user.accountType || "real" },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
      );

      await UserRepository.SaveIp(user.id, req, options);
      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async handleOnboardMobile(currentUser, invitationToken, tenantId, options) {
    if (invitationToken) {
      try {
        await TenantUserRepository.acceptInvitation(invitationToken, {
          ...options,
          currentUser,
          bypassPermissionValidation: true,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const isMultiTenantViaSubdomain =
      ["multi", "multi-with-subdomain"].includes(getConfig().TENANT_MODE) &&
      tenantId;

    if (isMultiTenantViaSubdomain) {
      await new TenantService({
        ...options,
        currentUser,
      }).joinWithDefaultRolesOrAskApproval(
        {
          tenantId,
          roles: [],
        },
        options
      );
    }

    const singleTenant = getConfig().TENANT_MODE === "single";

    if (singleTenant) {
      await new TenantService({
        ...options,
        currentUser,
      }).joinDefaultUsingInvitedEmail(options.session);

      await new TenantService({
        ...options,
        currentUser,
      }).createOrJoinDefaultMobile(
        {
          roles: [],
        },
        options.session
      );
    }
  }

  static async handleOnboard(currentUser, invitationToken, tenantId, options) {
    if (invitationToken) {
      try {
        await TenantUserRepository.acceptInvitation(invitationToken, {
          ...options,
          currentUser,
          bypassPermissionValidation: true,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const isMultiTenantViaSubdomain =
      ["multi", "multi-with-subdomain"].includes(getConfig().TENANT_MODE) &&
      tenantId;

    if (isMultiTenantViaSubdomain) {
      await new TenantService({
        ...options,
        currentUser,
      }).joinWithDefaultRolesOrAskApproval(
        {
          tenantId,
          roles: [],
        },
        options
      );
    }

    const singleTenant = getConfig().TENANT_MODE === "single";

    if (singleTenant) {
      await new TenantService({
        ...options,
        currentUser,
      }).joinDefaultUsingInvitedEmail(options.session);

      await new TenantService({
        ...options,
        currentUser,
      }).createOrJoinDefault(
        {
          roles: [],
        },
        options.session
      );
    }
  }

  static async findByToken(token, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, getConfig().AUTH_JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }

        const id = decoded.id;
        const jwtTokenIat = decoded.iat;

        UserRepository.findById(id, {
          ...options,
          bypassPermissionValidation: true,
        })
          .then((user) => {
            const isTokenManuallyExpired =
              user &&
              user.jwtTokenInvalidBefore &&
              moment
                .unix(jwtTokenIat)
                .isBefore(moment(user.jwtTokenInvalidBefore));

            if (isTokenManuallyExpired) {
              reject(new Error401());
              return;
            }

            if (user && !EmailSender.isConfigured) {
              user.emailVerified = true;
            }

            resolve(user);
          })
          .catch((error) => reject(error));
      });
    });
  }

  static async sendEmailAddressVerificationEmail(
    language,
    email,
    tenantId,
    options
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, "email.error");
    }

    let link;
    try {
      let tenant;

      if (tenantId) {
        tenant = await TenantRepository.findById(tenantId, { ...options });
      }

      email = email.toLowerCase();
      const token = await UserRepository.generateEmailVerificationToken(
        email,
        options
      );
      link = `${tenantSubdomain.frontendUrl(tenant)}/auth/verify-email?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(language, "auth.emailAddressVerificationEmail.error");
    }

    return new EmailSender(EmailSender.TEMPLATES.EMAIL_ADDRESS_VERIFICATION, {
      link,
    }).sendTo(email);
  }

  static async sendPasswordResetEmail(language, email, tenantId, options) {
    let user = await UserRepository.findByEmail(email, options);
    try {
      let tenant;

      if (tenantId) {
        tenant = await TenantRepository.findById(tenantId, { ...options });
      }

      email = email.toLowerCase();
      const token = await UserRepository.generatePasswordResetToken(
        email,
        options
      );
    } catch (error) {
      console.error(error);
      throw new Error400(language, "auth.passwordReset.error");
    }
  }

  static async sendPasswordResetEmailOriginal(
    language,
    email,
    tenantId,
    options
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, "email.error");
    }

    let link;
    try {
      let tenant;

      if (tenantId) {
        tenant = await TenantRepository.findById(tenantId, { ...options });
      }

      email = email.toLowerCase();
      const token = await UserRepository.generatePasswordResetToken(
        email,
        options
      );

      link = `${tenantSubdomain.frontendUrl(tenant)}/auth/password-reset?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(language, "auth.passwordReset.error");
    }

    return new EmailSender(EmailSender.TEMPLATES.PASSWORD_RESET, {
      link,
    }).sendTo(email);
  }

  static async verifyEmail(token, options) {
    const currentUser = options.currentUser;

    const user = await UserRepository.findByEmailVerificationToken(
      token,
      options
    );

    if (!user) {
      throw new Error400(
        options.language,
        "auth.emailAddressVerificationEmail.invalidToken"
      );
    }

    if (currentUser && currentUser.id && currentUser.id !== user.id) {
      throw new Error400(
        options.language,
        "auth.emailAddressVerificationEmail.signedInAsWrongUser",
        user.email,
        currentUser.email
      );
    }

    return UserRepository.markEmailVerified(user.id, options);
  }

  static async passwordReset(token, password, options: any = {}) {
    const user = await UserRepository.findByPasswordResetToken(token, options);
    if (!user) {
      throw new Error400(options.language, "auth.passwordReset.invalidToken");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    return UserRepository.updatePassword(user.id, hashedPassword, true, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async changePassword(oldPassword, newPassword, options) {
    const currentUser = options.currentUser;
    const currentPassword = await UserRepository.findPassword(
      options.currentUser.id,
      options
    );

    const passwordsMatch = await bcrypt.compare(oldPassword, currentPassword);

    if (!passwordsMatch) {
      throw new Error400(
        options.language,
        "auth.passwordChange.invalidPassword"
      );
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_SALT_ROUNDS
    );

    return UserRepository.updatePassword(
      currentUser.id,
      newHashedPassword,
      true,
      options
    );
  }

  static async signinFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options: any = {}
  ) {
    if (!email) {
      throw new Error("auth-no-email");
    }

    const session = await MongooseRepository.createSession(options.database);

    try {
      email = email.toLowerCase();
      let user = await UserRepository.findByEmail(email, options);

      if (
        user &&
        (user.provider !== provider || user.providerId !== providerId)
      ) {
        throw new Error("auth-invalid-provider");
      }

      if (!user) {
        user = await UserRepository.createFromSocial(
          provider,
          providerId,
          email,
          emailVerified,
          firstName,
          lastName,
          options
        );
      }

      const token = jwt.sign(
        { id: user.id, accountType: user.accountType || "real" },
        getConfig().AUTH_JWT_SECRET,
        {
          expiresIn: getConfig().AUTH_JWT_EXPIRES_IN,
        }
      );

      await MongooseRepository.commitTransaction(session);
      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}

export default AuthService;
