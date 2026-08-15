import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/product/importer/productImporterSelectors';
import fields from 'src/modules/product/importer/productImporterFields';
import { i18n } from 'src/i18n';
import ProductService from 'src/modules/product/productService';

const productImporterActions = importerActions(
  'COUPONS_IMPORTER',
  selectors,
  ProductService.import,
  fields,
  i18n('entities.product.importer.fileName'),
);

export default productImporterActions;