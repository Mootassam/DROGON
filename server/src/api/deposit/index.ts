export default (app, io) => {
  app.post(`/tenant/:tenantId/deposit`, require("./depositCreate").default(io));
  app.post(`/tenant/:tenantId/deposit/from-backend`, require("./depositFromBackend").default(io));

  app.put(
    `/tenant/:tenantId/deposit/:id`,
    require("./depositUpdate").default(io)
  );
  app.put(
    `/tenant/:tenantId/depositupdate/:id`,
    require("./depositUpdateStatus").default(io)
  );
  app.post(
    `/tenant/:tenantId/deposit/import`,
    require("./depositImport").default
  );
  app.delete(`/tenant/:tenantId/deposit`, require("./depositDestroy").default);
  app.get(
    `/tenant/:tenantId/deposit/autocomplete`,
    require("./depositAutocomplete").default
  );
  app.get(`/tenant/:tenantId/deposit`, require("./depositList").default);
  app.get(`/tenant/:tenantId/deposit/:id`, require("./depositFind").default);
};
