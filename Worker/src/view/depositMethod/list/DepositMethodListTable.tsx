import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import depositMethodSelectors from 'src/modules/depositMethod/depositMethodSelectors';

import actions from 'src/modules/depositMethod/list/depositMethodListActions';
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';

function DepositMethodListTable() {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const loading = findLoading;


  const rows = useSelector(selectors.selectRows);
  console.log(rows);

  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  const hasPermissionToEdit = useSelector(depositMethodSelectors.selectPermissionToEdit);

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

  const doToggleAllSelected = () =>
    dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) =>
    dispatch(actions.doToggleOneSelected(id));



  return (
    <div className="deposit-method-list-container">
      <div className="table-responsive">
        <table className="deposit-method-list-table">
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
                onClick={() => doChangeSort('symbol')}
              >
                {i18n('entities.depositMethod.fields.symbol')}
                {sorter.field === 'symbol' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            
              <th
                className="sortable-header"
                onClick={() => doChangeSort('network')}
              >
                {i18n('entities.depositMethod.fields.depositNetwork')}
                {sorter.field === 'address' && (
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
                <td colSpan={5} className="loading-cell">
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
                <td colSpan={5} className="no-data-cell">
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
                  <td className="table-cell">{row.symbol}</td>
                  <td className="table-cell">{row?.network?.map((item) => <div style={{ display: 'flex' }}>{item?.name}</div>)}</td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action edit"
                          to={`/depositMethod/${row.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                          <span>{i18n('common.edit')}</span>
                        </Link>
                      )}
                      {/* Deleted the delete button */}
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
  );
}

export default DepositMethodListTable;
