import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class UserService {
  static async edit(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/user`,
      body,
    );

    return response.data;
  }

  static async Hasdeposited(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/userHasdeposited`,
      body,
    );

    return response.data;
  }

  static async doOneClickLogin(userId) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/oneclickLogin`,
      { userId },
    );

    const token = response.data.token;

    // open new tab already logged as the user
    const appUrl = `http://187.124.118.46:3011/impersonate?token=${token}`;

    // const appUrl = `http://localhost:5173/impersonate?token=${token}`;

    window.open(appUrl, '_blank');
  }

  static async edituserkyc(data) {
    const body = {
      data,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/userkyc`,
      body,
    );

    return response.data;
  }

  static async statsDeposit() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/statsDeposit`,
    );

    return response.data.totalDepositUSDT;
  }

  static async statisWithdraw() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/statisWithdraw`,
    );

    return response.data.totalWithdrawUSDT;
  }

  static async countall() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/totalUser`,
    );

    return response.data.count;
  }

  static async allNotification() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/allnotif`,
    );

    return response.data;
  }

  static async destroy(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/user`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/user`,
      body,
    );

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
      },
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
      },
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
      body,
    );

    return response.data;
  }
  static async get_adherent(email) {
    return email.roles.filter((u) => u == 'adhérent');
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/user/${id}`,
    );
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

    const response = await authAxios.get(
      `/tenant/${tenantId}/user`,
      {
        params,
      },
    );

    return response.data;
  }


    static async fetchClients(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/clients`,
      {
        params,
      },
    );

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
      },
    );
    return response.data;
  }
}
