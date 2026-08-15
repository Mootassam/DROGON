import authAxios from 'src/modules/shared/axios/authAxios';

export default class NumberService {
  static async UploadFile(formData) {
    const response = await authAxios.post(
      '/number/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }
}
