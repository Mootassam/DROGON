export default (app) => {


  app.post(
    `/tenant/:tenantId/futures`,
    require('./futuresCreate').default,
  );
  app.put(
    `/tenant/:tenantId/futures/:id`,
    require('./futuresUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/futures/import`,
    require('./futuresImport').default,
  );
  app.delete(
    `/tenant/:tenantId/futures`,
    require('./futuresDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/futures/autocomplete`,
    require('./futuresAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/futuresMobile`,
    require('./futuresListMobile').default,
  );



    app.get(
    `/tenant/:tenantId/futures`,
    require('./futuresList').default,
  );
  app.get(
    `/tenant/:tenantId/futures/:id`,
    require('./futuresFind').default,
  );


};
