import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/deposit/depositSelectors';
import destroyActions from 'src/modules/deposit/destroy/depositDestroyActions';
import destroySelectors from 'src/modules/deposit/destroy/depositDestroySelectors';
import actions from 'src/modules/deposit/list/depositListActions';
import selectors from 'src/modules/deposit/list/depositListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import depositActions from 'src/modules/deposit/form/depositFormActions';
import { formatDate } from 'src/view/shared/dates/formatDate';
import userFormActions from 'src/modules/user/form/userFormActions';

function DepositListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    couponsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) =>
    setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () =>
    setRecordIdToDestroy(null);

  const onSubmit = (row, values) => {
    const data = {
      ...row,
      status: values,
    };
    dispatch(depositActions.Update(row.id, data));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () =>
    dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) =>
    dispatch(actions.doToggleOneSelected(id));

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
                onClick={() => doChangeSort('depositType')}
              >
                {i18n('entities.deposit.fields.depositType')}
                {sorter.field === 'depositType' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('createdBy')}
              >
                {i18n('entities.deposit.fields.createdBy')}
                {sorter.field === 'createdBy' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('amount')}
              >
                {i18n('entities.deposit.fields.amount')}
                {sorter.field === 'amount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('rechargechannel')
                }
              >
                {i18n(
                  'entities.deposit.fields.rechargechannel',
                )}
                {sorter.field === 'rechargechannel' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('txid')}
              >
                {i18n('entities.deposit.fields.txid')}
                {sorter.field === 'txid' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('rechargetime')}
              >
                {i18n(
                  'entities.deposit.fields.rechargetime',
                )}
                {sorter.field === 'rechargetime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('auditor')}
              >
                {i18n('entities.deposit.fields.auditor')}
                {sorter.field === 'auditor' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('acceptime')}
              >
                {i18n('entities.deposit.fields.acceptime')}
                {sorter.field === 'acceptime' && (
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
                <td colSpan={12} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={12} className="no-data-cell">
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
                        checked={selectedKeys.includes(
                          row.id,
                        )}
                        onChange={() =>
                          doToggleOneSelected(row.id)
                        }
                      />
                    </div>
                  </td>
                  <td className="table-cell">
                    {row.depositType}
                  </td>
                  <td className="table-cell">
                    <UserListItem value={row.createdBy} />
                  </td>
                  <td className="table-cell numeric">
                    {row.amount}
                  </td>
                  <td className="table-cell">
                    {row.rechargechannel}
                  </td>
                  <td className="table-cell">{row.txid}</td>
                  <td className="table-cell">
                    {formatDate(row.rechargetime)}
                  </td>
                  <td className="table-cell">
                    <UserListItem value={row.auditor} />
                  </td>
                  <td className="table-cell">
                    {formatDate(row.acceptime)}
                  </td>

                  <td className="actions-cell">
                    <div className="actions-container">
                      {row.status === 'pending' ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                          }}
                        >
                          <button
                            className="btn-action edit"
                            onClick={() =>
                              onSubmit(row, 'success')
                            }
                          >
                            Pass
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() =>
                              onSubmit(row, 'canceled')
                            }
                          >
                            Rejection
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`status-badge ${
                            row.status === 'success'
                              ? 'success'
                              : 'canceled'
                          }`}
                        >
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
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
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

export default DepositListTable;
