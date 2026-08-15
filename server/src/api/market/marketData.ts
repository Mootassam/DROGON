import ApiResponseHandler from '../apiResponseHandler';
import marketDataService from '../../services/marketDataService';

export default async (req, res, next) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const data = await marketDataService.getMarketData(forceRefresh);
    await ApiResponseHandler.success(req, res, data);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
