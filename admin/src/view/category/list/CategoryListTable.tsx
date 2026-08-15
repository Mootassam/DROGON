import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import categorySelectors from 'src/modules/category/categorySelectors';
import destroyActions from 'src/modules/category/destroy/categoryDestroyActions';
import destroySelectors from 'src/modules/category/destroy/categoryDestroySelectors';
import actions from 'src/modules/category/list/categoryListActions';
import selectors from 'src/modules/category/list/categoryListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/category/form/categoryFormActions';

function CategoryListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const [imagePreview, setImagePreview] = useState({
    isOpen: false,
    imageUrl: '',
    title: '',
  });
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
  const hasPermissionToEdit = useSelector(categorySelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(categorySelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  // Open image preview modal
  const openImagePreview = (imageUrl, title) => {
    setImagePreview({
      isOpen: true,
      imageUrl: imageUrl,
      title: title,
    });
  };

  // Close image preview modal
  const closeImagePreview = () => {
    setImagePreview({
      isOpen: false,
      imageUrl: '',
      title: '',
    });
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const formSubmit = (id, e) => {
    let data = { status: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

  // Image Preview Modal Component
  const ImagePreviewModal = () => (
    <div className={`image-preview-modal ${imagePreview.isOpen ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={closeImagePreview}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{imagePreview.title}</h3>
          <button className="close-button" onClick={closeImagePreview}>
            ×
          </button>
        </div>
        <div className="image-container">
          <img src={imagePreview.imageUrl} alt={imagePreview.title} />
        </div>
        <div className="modal-footer">
          <button className="btn-action" onClick={closeImagePreview}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

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
                onClick={() => doChangeSort('name')}
              >
                {i18n('entities.category.fields.name')}
                {sorter.field === 'name' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>

              <th
                className="sortable-header"
                onClick={() => doChangeSort('status')}
              >
                {i18n('entities.category.fields.name')}
                {sorter.field === 'status' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>

              <th className="actions-header">status</th>
              
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={5} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">Loading data...</span>
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
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                    </div>
                  </td>

                  {/* Photo + Name combined? Actually we have separate photo column, but we can put photo inside name cell or separate. In the original KYC table, they have separate cells for images. Here we have only one photo. To match style, we'll create a cell for photo and one for name. */}
                  <td className="table-cell">
                    {row.photo && row.photo[0]?.downloadUrl ? (
                      <div
                        className="image-preview-thumbnail"
                        onClick={() =>
                          openImagePreview(
                            row.photo[0].downloadUrl,
                            `Category Photo - ${row.name}`
                          )
                        }
                      >
                        <img
                          src={row.photo[0].downloadUrl}
                          style={{ height: '50px', cursor: 'pointer' }}
                          alt={row.name}
                          title="Click to view larger"
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    ) : (
                      <span>No image</span>
                    )}
                  </td>

                  <td className="table-cell numeric">
                    {row.name}
                  </td>

                  <td className="table-cell">
                    <select
                      className="form-control"
                      name="status"
                      onChange={(e) => formSubmit(row.id, e)}
                      value={row.status}
                      style={{ width: '100%' }}
                    >
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </td>

                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action edit"
                          to={`/category/${row.id}/edit`}
                        >
                          {i18n('common.edit')}
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button
                          className="btn-action delete"
                          type="button"
                          onClick={() => doOpenDestroyConfirmModal(row.id)}
                        >
                          {i18n('common.destroy')}
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

      {/* Image Preview Modal */}
      {imagePreview.isOpen && <ImagePreviewModal />}

      {/* Delete Confirmation Modal */}
      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={doCloseDestroyConfirmModal}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {/* Styles copied from CouponsListTable for consistency */}
      <style>{`
        /* Image Preview Modal Styles */
        .image-preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: none;
        }

        .image-preview-modal.show {
          display: block;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
        }

        .modal-content {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 8px;
          max-width: max-content;
          max-height: 90%;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #666;
        }

        .close-button:hover {
          color: #000;
        }

        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          overflow: auto;
        }

        .image-container img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .modal-footer {
          padding: 1rem;
          border-top: 1px solid #eee;
          text-align: right;
        }

        /* Image Thumbnail Styles */
        .image-preview-thumbnail {
          position: relative;
          display: inline-block;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .image-preview-thumbnail:hover {
          transform: scale(1.05);
        }

        .image-preview-thumbnail:hover .image-overlay {
          opacity: 1;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .image-overlay i {
          color: white;
          font-size: 1.5rem;
        }

        /* Spot list table styles (from CouponsListTable) */
        .spot-list-container {
          padding: 1rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .spot-list-table {
          width: 100%;
          border-collapse: collapse;
        }
        .table-header th {
          background: #f5f5f5;
          padding: 12px;
          font-weight: 600;
          text-align: left;
          border-bottom: 2px solid #ddd;
        }
        .table-body td {
          padding: 12px;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
        }
        .checkbox-column {
          width: 40px;
          text-align: center;
        }
        .sortable-header {
          cursor: pointer;
          user-select: none;
        }
        .sort-icon {
          margin-left: 5px;
        }
        .actions-header {
          text-align: center;
        }
        .actions-cell {
          text-align: center;
        }
        .actions-container {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .btn-action {
          padding: 4px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-block;
        }
        .btn-action.edit {
          background: #4caf50;
          color: white;
        }
        .btn-action.delete {
          background: #f44336;
          color: white;
        }
        .btn-action:hover {
          opacity: 0.8;
        }
        .loading-cell, .no-data-cell {
          text-align: center;
          padding: 40px;
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .no-data-content {
          color: #999;
        }
        .no-data-icon {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .form-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        .table-cell.numeric {
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

export default CategoryListTable;