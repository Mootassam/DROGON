import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Roles from 'src/security/roles';
import UserStatusView from 'src/view/user/view/UserStatusView';
import recordListActions from 'src/modules/record/list/recordListActions';
import selectorTaskdone from 'src/modules/record/list/recordListSelectors';
import UserService from 'src/modules/user/userService';

function UserTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [totalTask, setTotalTasks] = useState('');
  const tasksdone = useSelector(
    selectorTaskdone.selectCountRecord,
  );
  const LoadingTasksDone = useSelector(
    selectorTaskdone.selectLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const [showTask, setShowTask] = useState(false);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const [dailytask, setDailyTask] = useState(0);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
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

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const showThecurrentRecord = async (
    dailyTask,
    totaltask?,
  ) => {
    setShowTask(true);
    setDailyTask(dailyTask);
    setTotalTasks(totaltask);
  };

  useEffect(() => { }, [dispatch, tasksdone]);
  const oneClick = async (id) => {
    await UserService.doOneClickLogin(id);
  };

  return (
    <>
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
                  onClick={() => doChangeSort('email')}
                >
                  {i18n('user.fields.email')}
                  {sorter.field === 'email' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend'
                        ? '↑'
                        : '↓'}
                    </span>
                  )}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('fullName')}
                >
                  {i18n('user.fields.fullName')}
                  {sorter.field === 'fullName' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend'
                        ? '↑'
                        : '↓'}
                    </span>
                  )}
                </th>

           
                <th>Location</th>
             
                <th className="sortable-header">
                  {i18n('user.fields.status')}
                </th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={8} className="loading-cell">
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
                  <td colSpan={8} className="no-data-cell">
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
                      {row.email}
                    </td>
                    <td className="table-cell">
                      {row.fullName}
                    </td>
                 
                    <td>
                      {' '}
                      {row.ipAddress} <br /> {row.country}{' '}
                    </td>
                    
                    <td className="table-cell">
                      <UserStatusView value={row?.tenants[0]?.status} />
                    </td>
                    <td className="actions-cell">
                      <div className="actions-container">
                
                        {hasPermissionToEdit && (
                          <Link
                            className="btn btn-link"
                            to={`/password-reset/${row.id}`}
                          >
                            <i className="fas fa-key"></i>
                          </Link>
                        )}
                        {hasPermissionToEdit && (
                          <Link
                            className="btn btn-link"
                            to={`/user/${row.id}/edit`}
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                        )}
                        {hasPermissionToDestroy && (
                          <button
                            className="btn-action delete"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                          >
                            <i className="fas fa-lock"></i>
                            <span>
                              {i18n('common.freeze')}
                            </span>
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
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {!LoadingTasksDone && showTask && (
        <div className="modal__socore">
          <div
            className="score__close"
            onClick={() => setShowTask(false)}
          >
            <i className="fa fa-close font" />
          </div>
          <div className="modal__contentscore">
            <p className="text__score">
              {dailytask} / {totalTask}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;
