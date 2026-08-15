export default (app) => {
  app.post(`/tenant/:tenantId/rules`, require("./rulesCreate").default);
  app.put(
    `/tenant/:tenantId/rules/:id`,
    require("./rulesUpdate").default
  );
  app.post(
    `/tenant/:tenantId/rules/import`,
    require("./rulesImport").default
  );
  app.delete(
    `/tenant/:tenantId/rules`,
    require("./rulesDestroy").default
  );
  app.get(
    `/tenant/:tenantId/rules/autocomplete`,
    require("./rulesAutocomplete").default
  );
  app.get(`/tenant/:tenantId/rules`, require("./rulesList").default);
  app.get(`/tenant/rules/all`, require("./rulesFindAll").default);
  app.get(`/tenant/:tenantId/rules/:id`, require("./rulesFind").default);
};
