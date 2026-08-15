
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import spotSelectors from 'src/modules/spot/spotSelectors';
import destroyActions from 'src/modules/spot/destroy/spotDestroyActions';
import destroySelectors from 'src/modules/spot/destroy/spotDestroySelectors';
import actions from 'src/modules/spot/list/spotListActions';
import selectors from 'src/modules/spot/list/spotListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';

function SpotListTable() {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  const hasPermissionToEdit = useSelector(spotSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(spotSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);
  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };
  const doToggleAllSelected = () => dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) => dispatch(actions.doToggleOneSelected(id));
  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };
  const doChangePagination = (pagination) => dispatch(actions.doChangePagination(pagination));

  return (
    <div className="spot-list-container">
      <div className="table-responsive">
        <table className="spot-list-table">
          <thead className="table-header">
            <tr>
              <th className="checkbox-column">
                {hasRows && (
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={doToggleAllSelected}
                    />
                  </div>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('orderNo')}
              >
                {i18n('entities.spot.fields.orderNo')}
                {sorter.field === 'orderNo' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('userAccount')}
              >
                {i18n('entities.spot.fields.userAccount')}
                {sorter.field === 'userAccount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('tradingPair')}
              >
                {i18n('entities.spot.fields.tradingPair')}
                {sorter.field === 'tradingPair' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('direction')}
              >
                {i18n('entities.spot.fields.direction')}
                {sorter.field === 'direction' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('delegateType')}
              >
                {i18n('entities.spot.fields.delegateType')}
                {sorter.field === 'delegateType' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('delegateState')}
              >
                {i18n('entities.spot.fields.delegateState')}
                {sorter.field === 'delegateState' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('orderQuantity')}
              >
                {i18n('entities.spot.fields.orderQuantity')}
                {sorter.field === 'orderQuantity' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('commissionPrice')}
              >
                {i18n('entities.spot.fields.commissionPrice')}
                {sorter.field === 'commissionPrice' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('entrustedValue')}
              >
                {i18n('entities.spot.fields.entrustedValue')}
                {sorter.field === 'entrustedValue' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('transactionQuantity')}
              >
                {i18n('entities.spot.fields.transactionQuantity')}
                {sorter.field === 'transactionQuantity' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('transactionValue')}
              >
                {i18n('entities.spot.fields.transactionValue')}
                {sorter.field === 'transactionValue' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('closingPrice')}
              >
                {i18n('entities.spot.fields.closingPrice')}
                {sorter.field === 'closingPrice' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('handlingFee')}
              >
                {i18n('entities.spot.fields.handlingFee')}
                {sorter.field === 'handlingFee' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('commissionTime')}
              >
                {i18n('entities.spot.fields.commissionTime')}
                {sorter.field === 'commissionTime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('closingTime')}
              >
                {i18n('entities.spot.fields.closingTime')}
                {sorter.field === 'closingTime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('createdBy')}
              >
                {i18n('entities.spot.fields.createdBy')}
                {sorter.field === 'createdBy' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
 
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={18} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={18} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="checkbox-column">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                    </div>
                  </td>
                  <td className="table-cell">{row.orderNo}</td>
                  <td className="table-cell">{row.userAccount}</td>
                  <td className="table-cell">{row.tradingPair}</td>
                  <td className="table-cell">
                    <span className={`direction-badge ${row.direction === 'buy' ? 'buy' : 'sell'}`}>
                      {row.direction}
                    </span>
                  </td>
                  <td className="table-cell">{row.delegateType}</td>
                  <td className="table-cell">
                    <span className="status-badge">{row.delegateState}</span>
                  </td>
                  <td className="table-cell numeric">{row.orderQuantity}</td>
                  <td className="table-cell numeric">{row.commissionPrice}</td>
                  <td className="table-cell numeric">{row.entrustedValue}</td>
                  <td className="table-cell numeric">{row.transactionQuantity}</td>
                  <td className="table-cell numeric">{row.transactionValue}</td>
                  <td className="table-cell numeric">{row.closingPrice}</td>
                  <td className="table-cell numeric">{row.handlingFee}</td>
                  <td className="table-cell">{row.commissionTime}</td>
                  <td className="table-cell">{row.closingTime}</td>
                  <td className="table-cell"><UserListItem value={row.createdBy} /></td>
            
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <Pagination onChange={doChangePagination} disabled={loading} pagination={pagination} />
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={doCloseDestroyConfirmModal}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
     
      `}</style>
    </div>
  );
}

export default SpotListTable;