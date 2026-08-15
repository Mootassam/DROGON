import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class depositService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/assets/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.delete(
      `/tenant/${tenantId}/assets`,
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
      `/tenant/${tenantId}/assets`,
      body,
    );

    return response.data;
  }

  static async transfer(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/assets/transfer`,
      body,
    );

    return response.data;
  }

  static async import(values, importHash) {
    const body = {
      data: values,
      importHash,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/assets/import`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/assets/${id}`,
    );

    return response.data;
  }

    static async Convert(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/convert/${id}`,
    );

    return response.data;
  }

  static async list(filter,fiat ) {
    const params = {
      filter,
      fiat
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/assetsmobile`,
      {
        params,
      },
    );

    return response.data;
  }


  static async transferList(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit: 50,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/transfer/all`,
      {
        params,
      },
    );

    return response.data;
  }




  static async listAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/assets/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
