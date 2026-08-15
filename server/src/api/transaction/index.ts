export default (app) => {
  app.post(
    `/tenant/:tenantId/transaction`,
    require("./transactionCreate").default
  );
  app.put(
    `/tenant/:tenantId/transaction/:id`,
    require("./transactionUpdate").default
  );
  app.post(
    `/tenant/:tenantId/transaction/import`,
    require("./transactionImport").default
  );
  app.delete(
    `/tenant/:tenantId/transaction`,
    require("./transactionDestroy").default
  );
  app.get(
    `/tenant/:tenantId/transaction/autocomplete`,
    require("./transactionAutocomplete").default
  );
  app.get(
    `/tenant/:tenantId/transaction`,
    require("./transactionList").default
  );


  app.get(
    `/tenant/:tenantId/reward`,
    require("./transactionReward").default
  );


    app.get(
    `/tenant/:tenantId/transactionMobile`,
    require("./transactionListMobile").default
  );

  app.get(
    `/tenant/:tenantId/transaction/byUser`,
    require("./transactionByUser").default
  );
  app.get(
    `/tenant/:tenantId/transaction/:id`,
    require("./transactionFind").default
  );
};
