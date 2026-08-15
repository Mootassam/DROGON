import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import stackingSelectors from 'src/modules/stacking/stackingSelectors';
import destroyActions from 'src/modules/stacking/destroy/stackingDestroyActions';
import destroySelectors from 'src/modules/stacking/destroy/stackingDestroySelectors';
import actions from 'src/modules/stacking/list/stackingListActions';
import selectors from 'src/modules/stacking/list/stackingListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import StackingPlanListItem from 'src/view/stackingPlan/list/StackingPlanListItem';

function StackingListTable() {
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
                onClick={() => doChangeSort('user')}
              >
                {i18n('entities.stacking.fields.user')}
                {sorter.field === 'user' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('currency')}
              >
                {i18n('entities.stacking.fields.currency')}
                {sorter.field === 'currency' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('amount')}
              >
                {i18n('entities.stacking.fields.amount')}
                {sorter.field === 'amount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>

              {/* ✅ Changed from apy → dailyRate */}
              <th
                className="sortable-header"
                onClick={() => doChangeSort('dailyRate')}
              >
                {i18n('entities.stacking.fields.dailyRate')}
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
                {i18n('entities.stacking.fields.minimumStake')}
                {sorter.field === 'minimumStake' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('unstakingPeriod')}
              >
                {i18n('entities.stacking.fields.unstakingPeriod')}
                {sorter.field === 'unstakingPeriod' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('earnedRewards')}
              >
                {i18n('entities.stacking.fields.earnedRewards')}
                {sorter.field === 'earnedRewards' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('startDate')}
              >
                {i18n('entities.stacking.fields.startDate')}
                {sorter.field === 'startDate' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('endDate')}
              >
                {i18n('entities.stacking.fields.endDate')}
                {sorter.field === 'endDate' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('status')}
              >
                {i18n('entities.stacking.fields.status')}
                {sorter.field === 'status' && (
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
                        checked={selectedKeys.includes(row.id)}
                        onChange={() =>
                          doToggleOneSelected(row.id)
                        }
                      />
                    </div>
                  </td>
                  <td className="table-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="table-cell">
                    
                       <StackingPlanListItem value={row.plan} />
                    
                    {row.currency}</td>
                  <td className="table-cell numeric">{row.amount}</td>

                  {/* ✅ Changed from row.apy → row.dailyRate */}
                  <td className="table-cell numeric">
                    {row?.plan?.dailyRate}%
                  </td>

                  <td className="table-cell numeric">
                    {row?.plan?.minimumStake}
                  </td>
                  <td className="table-cell numeric">
                    {row.plan.unstakingPeriod} days
                  </td>
                  <td className="table-cell numeric">
                    {row.earnedRewards}
                  </td>
                  <td className="table-cell">{row.startDate}</td>
                  <td className="table-cell">{row.endDate}</td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${
                        row.status === 'active'
                          ? 'active'
                          : row.status === 'completed'
                          ? 'completed'
                          : 'canceled'
                      }`}
                    >
                      {row.status}
                    </span>
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

export default StackingListTable;
