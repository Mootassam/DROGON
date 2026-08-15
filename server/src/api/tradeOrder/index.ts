export default (app) => {
  // Mobile / user-facing routes
  app.post(`/tenant/:tenantId/trade-orders`,              require("./create").default);
  app.get(`/tenant/:tenantId/trade-orders`,               require("./list").default);
  app.put(`/tenant/:tenantId/trade-orders/:id/close`,     require("./close").default);
  app.put(`/tenant/:tenantId/trade-orders/:id/execute`,   require("./execute").default);
  app.put(`/tenant/:tenantId/trade-orders/:id/cancel`,    require("./cancel").default);

  // Global chart-injection feed (all authenticated users for this tenant)
  app.get(`/tenant/:tenantId/symbol-injections`,          require("./symbolInjections").default);

  // PUBLIC chart-injection feed — no auth / no tenant, so visitors who are not
  // logged in still see the same admin-applied profit/loss animation.
  app.get(`/symbol-injections-public`,                    require("./symbolInjectionsPublic").default);

  // Admin routes
  app.get(`/tenant/:tenantId/admin/trade-orders`,                  require("./adminList").default);
  app.put(`/tenant/:tenantId/admin/trade-orders/:id/close`,        require("./adminClose").default);
};
