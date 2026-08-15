export default (app) => {
  app.post(`/social/add`, require('./create').default);
  app.post(`/socail/update`, require('./update').default);
};
