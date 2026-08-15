import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import depositNetworkSelectors from 'src/modules/depositNetwork/depositNetworkSelectors';
import destroyActions from 'src/modules/depositNetwork/destroy/depositNetworkDestroyActions';
import destroySelectors from 'src/modules/depositNetwork/destroy/depositNetworkDestroySelectors';
import actions from 'src/modules/depositNetwork/list/depositNetworkListActions';
import selectors from 'src/modules/depositNetwork/list/depositNetworkListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';

function DepositNetworkListTable(props) {
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
  const hasPermissionToEdit = useSelector(depositNetworkSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(depositNetworkSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

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
    <div className="deposit-network-list-container">
      <div className="table-responsive">
        <table className="deposit-network-list-table">
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
                onClick={() => doChangeSort('name')}
              >
                {i18n('entities.depositNetwork.fields.name')}
                {sorter.field === 'name' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('wallet')}
              >
                {i18n('entities.depositNetwork.fields.wallet')}
                {sorter.field === 'wallet' && (
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
                <td colSpan={4} className="loading-cell">
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
                <td colSpan={4} className="no-data-cell">
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
                  <td className="table-cell">
                    {row.name}
                  </td>
                  <td className="table-cell wallet-cell">
                    <div className="wallet-address">
                      {row.wallet}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link
                          className="btn btn-icon btn-primary"
                          to={`/depositNetwork/${row.id}/edit`}
                        >
                          <i className="fas fa-edit" />
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button
                          className="btn btn-icon btn-danger"
                          onClick={() => doOpenDestroyConfirmModal(row.id)}
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
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

export default DepositNetworkListTable;