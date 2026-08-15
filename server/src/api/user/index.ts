export default (app) => {
  app.post(
    `/tenant/:tenantId/oneclickLogin`,
    require("./OneClickLogin").default
  );

  app.post(`/tenant/:tenantId/user`, require("./userCreate").default);

  app.put(`/tenant/:tenantId/user`, require("./userEdit").default);
  app.put(
    `/tenant/:tenantId/userHasdeposited`,
    require("./userHasDeposited").default
  );

  app.put(`/tenant/:tenantId/userkyc`, require("./userKyc").default);

  app.put(
    `/tenant/:tenantId/UpdateWithdrawPassword`,
    require("./UpdateWithdrawPassword").default
  );

  app.put(
    `/tenant/:tenantId/UpdateWallet`,
    require("./UpdateWalletAdress").default
  );

     app.put(
    `/tenant/:tenantId/user/updateMyBankInfo`,
    require("./userBankDetails").default
  );

        app.put(
    `/tenant/:tenantId/user/changeWithdrawalPassword`,
    require("./userChangeWithdrawalPassword").default
  );



  app.post(`/tenant/:tenantId/user/import`, require("./userImport").default);
  app.delete(`/tenant/:tenantId/user`, require("./userDestroy").default);
  app.get(`/tenant/:tenantId/user`, require("./userList").default);
  app.get(`/tenant/:tenantId/clients`, require("./userListClients").default);

  app.get(`/tenant/:tenantId/userTree`, require("./userTree").default);
  app.post(`/tenant/:tenantId/usersByLevel`, require("./usersByLevel").default);
  app.get(`/tenant/:tenantId/statsDeposit`, require("./statisDeposit").default);
  app.get(`/tenant/:tenantId/totalUser`, require("./totalUser").default);
  app.get(
    `/tenant/:tenantId/statisWithdraw`,
    require("./statisWithdraw").default
  );

  app.get(
    `/tenant/:tenantId/nonce/:id`,
    require("./walletNonce").default
  );

  app.post(
    `/tenant/:tenantId/verify`,
    require("./walletVerify").default
  );
  app.get(
    `/tenant/:tenantId/user/autocomplete`,
    require("./userAutocomplete").default
  );
  app.get(`/tenant/:tenantId/user/:id`, require("./userFind").default);
  app.get(
    `/tenant/:tenantId/userAdherantAutocomplete`,
    require("./userAdherantAutocomplete").default
  );
  app.get(
    `/tenant/:tenantId/userAdhesionList`,
    require("./userAdhesionList").default
  );
  app.get(`/tenant/:tenantId/userDonsList`, require("./userDonsList").default);
  app.get(
    `/tenant/:tenantId/userVotesList`,
    require("./userVotesList").default
  );
  app.get(
    `/tenant/:tenantId/userHistoriquesPointsList`,
    require("./userHistoriquePointsList").default
  );
};
