export default (app, io) => {
  app.post(
    `/tenant/:tenantId/notification`,
    require("./notificationCreate").default(io)
  );
  app.put(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationUpdate").default(io)
  );
  app.put(
    `/tenant/:tenantId/notificationupdate/:id`,
    require("./notificationUpdateStatus").default(io)
  );
  app.post(
    `/tenant/:tenantId/notification/import`,
    require("./notificationImport").default
  );
  app.delete(
    `/tenant/:tenantId/notification`,
    require("./notificationDestroy").default
  );
  app.get(
    `/tenant/:tenantId/notification/autocomplete`,
    require("./notificationAutocomplete").default
  );
  app.get(`/tenant/:tenantId/allnotif`, require("./notificationCount").default);
  app.get(
    `/tenant/:tenantId/notification`,
    require("./notificationList").default
  );

  app.get(
    `/tenant/:tenantId/notificationMobile`,
    require("./notificationListMobile").default
  );
  
  app.get(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationFind").default
  );
};
