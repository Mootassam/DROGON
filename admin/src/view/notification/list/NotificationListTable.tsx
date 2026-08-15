import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/notification/notificationSelectors';
import destroyActions from 'src/modules/notification/destroy/notificationDestroyActions';
import destroySelectors from 'src/modules/notification/destroy/notificationDestroySelectors';
import actions from 'src/modules/notification/list/notificationListActions';
import selectors from 'src/modules/notification/list/notificationListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import notificationActions from 'src/modules/notification/form/notificationFormActions';
import { formatDate } from 'src/view/shared/dates/formatDate';
import userFormActions from 'src/modules/user/form/userFormActions';

function NotificationListTable(props) {
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
    dispatch(notificationActions.Update(row.id, data));
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
  <table className="notification-table">
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
        onClick={() => doChangeSort('userId')}
      >
        {i18n('entities.notification.fields.user')}
        {sorter.field === 'userId' && (
          <span className="sort-icon">
            {sorter.order === 'ascend' ? '↑' : '↓'}
          </span>
        )}
      </th>

      <th
        className="sortable-header"
        onClick={() => doChangeSort('type')}
      >
        {i18n('entities.notification.fields.type')}
        {sorter.field === 'type' && (
          <span className="sort-icon">
            {sorter.order === 'ascend' ? '↑' : '↓'}
          </span>
        )}
      </th>

      <th className="table-cell">
        {i18n('entities.notification.fields.message')}
      </th>

      <th
        className="sortable-header"
        onClick={() => doChangeSort('status')}
      >
        {i18n('entities.notification.fields.status')}
        {sorter.field === 'status' && (
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
        <td colSpan={6} className="loading-cell">
          <div className="loading-container">
            <Spinner />
            <span className="loading-text">Loading data...</span>
          </div>
        </td>
      </tr>
    )}

    {/* {!loading && !hasRows && (
      <tr>
        <td colSpan={6} className="no-data-cell">
          <div className="no-data-content">
            <i className="fas fa-database no-data-icon"></i>
            <p>{i18n('table.noData')}</p>
          </div>
        </td>
      </tr>
    )} */}

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
            <UserListItem value={row.userId} />
          </td>

          <td className="table-cell">{row.type}</td>

          <td className="table-cell">{row.message}</td>

          <td className="table-cell">
            <span className={`status-badge ${row.status}`}>
              {row.status}
            </span>
          </td>

          <td className="actions-cell">
            <div className="actions-container">
              {/* Example actions: mark as read/unread */}
              {row.status === 'unread' ? (
                <button
                  className="btn-action edit"
                  onClick={() => onSubmit(row, 'read')}
                >
                  Mark as Read
                </button>
              ) : (
                <button
                  className="btn-action delete"
                  onClick={() => onSubmit(row, 'unread')}
                >
                  Mark as Unread
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

export default NotificationListTable;
