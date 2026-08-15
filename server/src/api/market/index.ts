import marketData from './marketData';

export default (app) => {
  app.get('/market/data', marketData);
};
