export default (app) => {
  app.get(`/single`, require('./tenantList').default);
};
