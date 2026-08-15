import authAxios from "src/modules/shared/axios/authAxios";
import AuthCurrentTenant from "src/modules/auth/authCurrentTenant";
import AuthInvitationToken from "../auth/authInvitationToken";

export default class UserService {
  static async edit(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(`/tenant/${tenantId}/user`, body);

    return response.data;
  }

  static async userTree(data) {


    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(`/tenant/${tenantId}/userTree`, {
      params: { refCode: data }, // whatever key you need
    });

    return response.data;
  }

  static async userBylevel(data) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/usersByLevel`,
      data
    );

    return response.data;
  }


    static async editBankDetails(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/user/updateMyBankInfo`,
      body,
    );

    return response.data;
  }



  static async changeWithdrawPassword(data) {

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/user/changeWithdrawalPassword`,
      data,
    );

    return response.data;
  }



  static async userNonce(address) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/nonce/${address}`,
    );
    return response.data;
  }


  static async verify(data) {

    const invitationToken = AuthInvitationToken.get();
    const tenantId = await UserService.getSingle();

    const response = await authAxios.post(
      `/tenant/${tenantId}/verify`, { tenantId, invitationToken, ...data }
    );
    return response.data;
  }



  static async UpdateWithdrawPassword(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/UpdateWithdrawPassword`,
      body
    );

    return response.data;
  }

  static async UpdateWalletAdress(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/UpdateWallet
      `,
      body
    );

    return response.data;
  }

  static async getSingle() {
    const response = await authAxios.get(`/single`);
    return response.data.rows[0].id;
  }

  static async destroy(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(`/tenant/${tenantId}/user`, {
      params,
    });

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(`/tenant/${tenantId}/user`, body);

    return response.data;
  }

  static async listAdherantAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/userAdherantAutocomplete`,
      {
        params,
      }
    );

    return response.data;
  }
  static async userAdhesionList(query, limit) {
    const params = {
      query,
      limit,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/userAdhesionList`,
      {
        params,
      }
    );

    return response.data;
  }

  static async import(values, importHash) {
    const body = {
      data: {
        ...values,
      },
      importHash,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/user/import`,
      body
    );

    return response.data;
  }
  static async get_adherent(email) {
    return email.roles.filter((u) => u == "adhérent");
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(`/tenant/${tenantId}/user/${id}`);
    return response.data;
  }

  static async countReward() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(`/tenant/${tenantId}/reward`);
    return response.data;
  }

  static async fetchUsers(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(`/tenant/${tenantId}/user`, {
      params,
    });

    return response.data;
  }

  static async fetchUserAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/user/autocomplete`,
      {
        params,
      }
    );
    return response.data;
  }
}
