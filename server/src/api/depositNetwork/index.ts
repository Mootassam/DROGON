export default (app, io) => {
  app.post(`/tenant/:tenantId/depositNetwork`, require("./depositNetworkCreate").default(io));
  app.put(
    `/tenant/:tenantId/depositNetwork/:id`,
    require("./depositNetworkUpdate").default(io)
  );
  app.put(
    `/tenant/:tenantId/depositNetworkupdate/:id`,
    require("./depositNetworkUpdateStatus").default(io)
  );
  app.post(
    `/tenant/:tenantId/depositNetwork/import`,
    require("./depositNetworkImport").default
  );
  app.delete(`/tenant/:tenantId/depositNetwork`, require("./depositNetworkDestroy").default);
  app.get(
    `/tenant/:tenantId/depositNetwork/autocomplete`,
    require("./depositNetworkAutocomplete").default
  );
  app.get(`/tenant/:tenantId/depositNetwork`, require("./depositNetworkList").default);
  app.get(`/tenant/:tenantId/depositNetwork/:id`, require("./depositNetworkFind").default);
};
