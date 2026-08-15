import authAxios from 'src/modules/shared/axios/authAxios';

export default class TenantService {
  
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const response = await authAxios.put(
      `/tenant/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const response = await authAxios.delete(`/tenant`, {
      params,
    });

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(`/tenant`, body);

    return response.data;
  }

  static async acceptInvitation(
    token,
    forceAcceptOtherEmail = false,
  ) {
    const response = await authAxios.post(
      `/tenant/invitation/${token}/accept`,
      {
        forceAcceptOtherEmail,
      },
    );

    return response.data;
  }

  static async declineInvitation(token) {
    const params = null;

    const response = await authAxios.delete(
      `/tenant/invitation/${token}/decline`,
      {
        params,
      },
    );

    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(`/tenant/${id}`);
    return response.data;
  }

  static async findByUrl(url) {
    const response = await authAxios.get(`/tenant/url`, {
      params: { url },
    });
    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/tenant`, {
      params,
    });

    return response.data;
  }
}
