import ApiResponseHandler from '../apiResponseHandler';
import socialRepository from '../../database/repositories/socialRepository';

export default async (req, res, next) => {
  try {
    const payload = await socialRepository.destroy(
      req.body.number,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
