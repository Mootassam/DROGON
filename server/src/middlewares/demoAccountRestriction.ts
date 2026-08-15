import Error403 from '../errors/Error403';

/**
 * Middleware to restrict demo accounts from performing financial operations.
 * Demo accounts can only trade futures; they cannot deposit, withdraw, change passwords, KYC, or bind accounts.
 * Read-only GET requests are allowed (e.g., fetching KYC status, deposit methods).
 */
export default async function demoAccountRestriction(req, res, next) {
  // If no user logged in or not demo, allow
  if (!req.currentUser || req.currentUser.accountType !== 'demo') {
    return next();
  }

  const path = req.path;
  const method = req.method;

  // Allow safe HTTP methods (read-only operations)
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return next();
  }

  // Patterns that match API endpoints for restricted actions (non-GET)
  // These regex patterns match the endpoint anywhere in the path
  const restrictedPatterns = [
    /\/deposit($|\/)/,           // deposit endpoints
    /\/withdraw($|\/)/,           // withdraw endpoints
    /\/kyc($|\/)/,                // KYC endpoints
    /\/UpdateWallet/,             // update wallet address
    /\/UpdateWithdrawPassword/,   // update withdraw password
    /\/userkyc/,                  // user KYC via user endpoint
    /\/changeWithdrawalPassword/, // change withdrawal password
    /\/updateMyBankInfo/,         // update bank info
    /\/bind-account/,             // bind account endpoint
    /\/loginPassword/,            // set/login password
    /\/withdrawPassword/,         // set withdraw password
    /\/typepassword/,             // change password endpoint
    /\/passwordchange/,           // change password
    /\/change-password/,          // change password
    /\/updateProfile/,            // update profile might be allowed? but okay to allow
  ];

  const isRestricted = restrictedPatterns.some(pattern => pattern.test(path));

  if (isRestricted) {
    return res.status(403).json({
      success: false,
      message: 'Demo accounts are not allowed to perform this action.',
    });
  }

  return next();
}
