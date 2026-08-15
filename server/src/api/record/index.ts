export default (app) => {
  app.post(`/tenant/:tenantId/record`, require("./recordCreate").default);
  app.put(`/tenant/:tenantId/record/:id`, require("./recordUpdate").default);
  app.post(
    `/tenant/:tenantId/record/import`,
    require("./recordImport").default
  );
  app.delete(`/tenant/:tenantId/record`, require("./recordDestroy").default);
  app.get(
    `/tenant/:tenantId/record/autocomplete`,
    require("./recordAutocomplete").default
  );
  app.get(`/tenant/:tenantId/record`, require("./recordList").default);
  app.get(`/tenant/:tenantId/check`, require("./check").default);
  app.get(`/tenant/:tenantId/records`, require("./recordListMobile").default);
  app.get(`/tenant/:tenantId/record/count`, require("./recordCount").default); 
  app.get(`/tenant/:tenantId/record/tasksdone/:id`, require("./recordTasksdone").default); 
  app.get(`/tenant/:tenantId/count/recordperdays`, require("./recordperday").default); 
  app.get(`/tenant/:tenantId/record/:id`, require("./recordFind").default);

  // Futures market order endpoints
  app.post(`/tenant/:tenantId/futures-orders`, require("./futuresOrderCreate").default);
  app.put(`/tenant/:tenantId/futures-orders/:id/close`, require("./futuresOrderClose").default);
  app.get(`/tenant/:tenantId/futures-orders`, require("./futuresOrderList").default);
};
