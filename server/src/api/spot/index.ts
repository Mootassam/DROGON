export default (app) => {
  app.post(
    `/tenant/:tenantId/spot`,
    require('./spotCreate').default,
  );
  app.put(
    `/tenant/:tenantId/spot/:id`,
    require('./spotUpdate').default,
  );



  app.post(
    `/tenant/:tenantId/spotStatus`,
    require('./spotStatus').default,
  );
  app.post(
    `/tenant/:tenantId/spot/import`,
    require('./spotImport').default,
  );
  app.delete(
    `/tenant/:tenantId/spot`,
    require('./spotDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/spot/autocomplete`,
    require('./spotAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/spot`,
    require('./spotList').default,
  );

  app.get(
    `/tenant/:tenantId/spotListMobile`,
    require('./spotListMobile').default,
  );
  app.get(
    `/tenant/:tenantId/spot/:id`,
    require('./spotFind').default,
  );
};
