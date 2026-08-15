export default (app) => {
  app.post(
    `/tenant/:tenantId/assets`,
    require('./AssetsCreate').default,
  );
  app.put(
    `/tenant/:tenantId/assets/:id`,
    require('./AssetsUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/assets/import`,
    require('./AssetsImport').default,
  );

  app.post(
    `/tenant/:tenantId/assets/transfer`,
    require('./AssetsTransfer').default,
  );
  app.delete(
    `/tenant/:tenantId/assets`,
    require('./AssetsDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/assets/autocomplete`,
    require('./AssetsAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/assets`,
    require('./AssetsList').default,
  );


    app.get(
    `/tenant/:tenantId/assetsFreeze/:id`,
    require('./AssetsFreeze').default,
  );

  app.get(
    `/tenant/:tenantId/convert/:id`,
    require('./AssetsConvert').default,
  );

  app.get(
    `/tenant/:tenantId/assetsmobile`,
    require('./AssetsListMobile').default,
  );
  app.get(
    `/tenant/:tenantId/transfer/all`,
    require('./AssetsListTransfer').default,
  );
  app.get(
    `/tenant/:tenantId/assets/:id`,
    require('./AssetsFind').default,
  );
};
