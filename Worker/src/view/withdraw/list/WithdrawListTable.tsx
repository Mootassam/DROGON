import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/withdraw/withdrawSelectors';
import destroyActions from 'src/modules/withdraw/destroy/withdrawDestroyActions';
import destroySelectors from 'src/modules/withdraw/destroy/withdrawDestroySelectors';
import actions from 'src/modules/withdraw/list/withdrawListActions';
import selectors from 'src/modules/withdraw/list/withdrawListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import WithdrawActions from 'src/modules/withdraw/form/withdrawFormActions';
import { formatDate } from 'src/view/shared/dates/formatDate';

function WithdrawListTable(props) {
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
  const hasPermissionToEdit = useSelector(couponsSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(couponsSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  const onSubmit = (row, values) => {
    const data = {
      ...row,
      status: values,
    };
    dispatch(WithdrawActions.Update(row.id,data));
  };


  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) => dispatch(actions.doToggleOneSelected(id));

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
                onClick={() => doChangeSort('withdrawType')}
              >
                {i18n('entities.withdraw.fields.withdrawType')}
                {sorter.field === 'withdrawType' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('createdBy')}
              >
                {i18n('entities.withdraw.fields.createdBy')}
                {sorter.field === 'createdBy' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('currency')}
              >
                {i18n('entities.withdraw.fields.currency')}
                {sorter.field === 'currency' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('withdrawAmount')}
              >
                {i18n('entities.withdraw.fields.withdrawAmount')}
                {sorter.field === 'withdrawAmount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('fee')}
              >
                {i18n('entities.withdraw.fields.fee')}
                {sorter.field === 'fee' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('totalAmount')}
              >
                {i18n('entities.withdraw.fields.totalAmount')}
                {sorter.field === 'totalAmount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('auditor')}
              >
                {i18n('entities.withdraw.fields.auditor')}
                {sorter.field === 'auditor' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('acceptTime')}
              >
                {i18n('entities.withdraw.fields.acceptTime')}
                {sorter.field === 'acceptTime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
             
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={11} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={11} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row, index) => (
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
                  <td className="table-cell">{row.withdrawType}</td>
                  <td className="table-cell">
                    <UserListItem value={row.createdBy} />
                  </td>
                  <td className="table-cell">{row.currency}</td>
                  <td className="table-cell numeric">{row.withdrawAmount}</td>
                  <td className="table-cell numeric">{row.fee}</td>
                  <td className="table-cell numeric">{row.totalAmount}</td>



                  
                  <td className="table-cell">
                    <UserListItem value={row.auditor} />
                  </td>
                  <td className="table-cell">{formatDate(row.updatedAt)}</td>
          
                  <td className="actions-cell">
                    <div className="actions-container ">
                       {row.status === 'pending' ? (
                      <div className='flex__table'>
                        <button
                          className="btn-action edit"
                          onClick={() => onSubmit(row,'success')}
                        >
                          Pass
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => onSubmit(row,'canceled')}
                        >
                          Rejection
                        </button>
                      </div>
                    ) : (
                      <span className={`status-badge ${row.status === 'success' ? 'success' : 'canceled'}`}>
                        {row.status}
                      </span>
                    )}
                    </div>
                  
                  </td>
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
    </div>
  );
}

export default WithdrawListTable;