import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import transactionSelectors from 'src/modules/transaction/transactionSelectors';
import destroyActions from 'src/modules/transaction/destroy/transactionDestroyActions';
import destroySelectors from 'src/modules/transaction/destroy/transactionDestroySelectors';
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/transaction/form/transactionFormActions';
import UserListItem from 'src/view/user/list/UserListItem';

function TransactionListTable() {
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
  const hasPermissionToEdit = useSelector(transactionSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(transactionSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => dispatch(actions.doChangePagination(pagination));
  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) => dispatch(actions.doToggleOneSelected(id));

  const formSubmit = (id, e) => {
    let data = { status: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

  return (
    <TableWrapper>
      <div className="table-responsive">
        <table className="table table-striped mt-2">
          <thead className="thead">
            <tr>
              <TableColumnHeader className="th-checkbox">
                {hasRows && (
                  <div className="adherent-control adherent-checkbox">
                    <input
                      type="checkbox"
                      className="adherent-control-input"
                      id="table-header-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={() => doToggleAllSelected()}
                    />
                    <label htmlFor="table-header-checkbox" className="adherent-control-label">
                      &#160;
                    </label>
                  </div>
                )}
              </TableColumnHeader>

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'user'} label={i18n('entities.transaction.fields.user')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'type'} label={i18n('entities.transaction.fields.type')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'asset'} label={i18n('entities.transaction.fields.asset')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'relatedAsset'} label={i18n('entities.transaction.fields.relatedAsset')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'amount'} label={i18n('entities.transaction.fields.amount')} align="right" />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'status'} label={i18n('entities.transaction.fields.status')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'direction'} label={i18n('entities.transaction.fields.direction')} />

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name={'dateTransaction'} label={i18n('entities.transaction.fields.dateTransaction')} />

              <TableColumnHeader className="th-actions" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={100}>
                  <Spinner />
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={100}>
                  <div className="d-flex justify-content-center">{i18n('table.noData')}</div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id}>
                  <th className="th-checkbox" scope="row">
                    <div className="adherent-control adherent-checkbox">
                      <input
                        type="checkbox"
                        className="adherent-control-input"
                        id={`table-header-checkbox-${row.id}`}
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                      <label htmlFor={`table-header-checkbox-${row.id}`} className="adherent-control-label">
                        &#160;
                      </label>
                    </div>
                  </th>

                  <td><UserListItem value={row.user} /></td>
                  <td>{row.type}</td>
                  <td>{row.asset}</td>
                  <td>{row.relatedAsset}</td>
                  <td style={{ textAlign: 'right' }}>{row.amount}</td>
                  <td>
                    <select className="form-control" name="status" onChange={(e) => formSubmit(row.id, e)}>
                      {['pending', 'canceled', 'success'].map((status) => (
                        <option key={status} value={status} selected={row.status === status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{row.direction}</td>
                  <td>{row.dateTransaction ? new Date(row.dateTransaction).toLocaleString() : ''}</td>

                  <td className="td-actions">
                    <Link className="btn btn-link" to={`/transaction/${row.id}`}>
                      {i18n('common.view')}
                    </Link>
                    {hasPermissionToEdit && (
                      <Link className="btn btn-link" to={`/transaction/${row.id}/edit`}>
                        {i18n('common.edit')}
                      </Link>
                    )}
                    {hasPermissionToDestroy && (
                      <button className="btn btn-link" type="button" onClick={() => doOpenDestroyConfirmModal(row.id)}>
                        {i18n('common.destroy')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination onChange={doChangePagination} disabled={loading} pagination={pagination} />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </TableWrapper>
  );
}

export default TransactionListTable;
