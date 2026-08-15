import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import stackingSelectors from 'src/modules/stackingPlan/stackingPlanSelectors';
import destroyActions from 'src/modules/stackingPlan/destroy/stackingPlanDestroyActions';
import destroySelectors from 'src/modules/stackingPlan/destroy/stackingPlanDestroySelectors';
import actions from 'src/modules/stackingPlan/list/stackingPlanPlanListActions';
import selectors from 'src/modules/stackingPlan/list/stackingPlanListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';

function StackingPlanListTable() {
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
  const hasPermissionToEdit = useSelector(stackingSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(stackingSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

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
                onClick={() => doChangeSort('currency')}
              >
                {i18n('entities.stackingPlan.fields.currency')}
                {sorter.field === 'currency' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('dailyRate')}
              >
                {i18n('entities.stackingPlan.fields.dailyRate')}
                {sorter.field === 'dailyRate' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('minimumStake')}
              >
                {i18n('entities.stackingPlan.fields.minimumStake')}
                {sorter.field === 'minimumStake' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('maxStake')}
              >
                {i18n('entities.stackingPlan.fields.maxStake')}
                {sorter.field === 'maxStake' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('unstakingPeriod')}
              >
                {i18n('entities.stackingPlan.fields.unstakingPeriod')}
                {sorter.field === 'unstakingPeriod' && (
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
                <td colSpan={7} className="loading-cell">
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
                <td colSpan={7} className="no-data-cell">
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
                        onChange={() =>
                          doToggleOneSelected(row.id)
                        }
                      />
                    </div>
                  </td>
                  <td className="table-cell">{row.currency}</td>
                  <td className="table-cell numeric">
                    {row.dailyRate}%
                  </td>
                  <td className="table-cell numeric">
                    {row.minimumStake}
                  </td>
                  <td className="table-cell numeric">
                    {row.maxStake}
                  </td>
                  <td className="table-cell numeric">
                    {row.unstakingPeriod} days
                  </td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action edit"
                          to={`/stackingPlan/${row.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                          <span>{i18n('common.edit')}</span>
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button
                          className="btn-action delete"
                          type="button"
                          onClick={() =>
                            doOpenDestroyConfirmModal(row.id)
                          }
                        >
                          <i className="fas fa-trash"></i>
                          <span>{i18n('common.destroy')}</span>
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

export default StackingPlanListTable;
