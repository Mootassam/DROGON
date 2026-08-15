import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/kyc/kycSelectors';
import destroyActions from 'src/modules/kyc/destroy/kycDestroyActions';
import destroySelectors from 'src/modules/kyc/destroy/kycDestroySelectors';
import actions from 'src/modules/kyc/list/kycListActions';
import selectors from 'src/modules/kyc/list/kycListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import kycActions from 'src/modules/kyc/form/kycFormActions';
import userFormAction from 'src/modules/user/form/userFormActions';

function CouponsListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [imagePreview, setImagePreview] = useState({
    isOpen: false,
    imageUrl: '',
    title: '',
  });
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

  const onSubmit = (id, values, user) => {
    const data = {
      user: user,
      status: values,
    };
    const value = {
      user: user,
      kyc: values === 'success' ? true : false,
    };

    dispatch(kycActions.doUpdate(id, data));
    dispatch(userFormAction.edituserkyc(value));
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

  // Image Preview Modal Component
  const ImagePreviewModal = () => (
    <div
      className={`image-preview-modal ${
        imagePreview.isOpen ? 'show' : ''
      }`}
    >
      <div
        className="modal-overlay"
        onClick={closeImagePreview}
      ></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{imagePreview.title}</h3>
          <button
            className="close-button"
            onClick={closeImagePreview}
          >
            ×
          </button>
        </div>
        <div className="image-container">
          <img
            src={imagePreview.imageUrl}
            alt={imagePreview.title}
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn-action"
            onClick={closeImagePreview}
          >
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
                onClick={() => doChangeSort('type')}
              >
                {i18n('entities.kyc.fields.useraccount')}
                {sorter.field === 'type' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('noOfTimes')}
              >
                {i18n('entities.kyc.fields.documenttype')}
                {sorter.field === 'noOfTimes' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.realname')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.idnumber')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n(
                  'entities.kyc.fields.frontofcertificate',
                )}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n(
                  'entities.kyc.fields.backofcertificate',
                )}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.selfie')}
                {sorter.field === 'levelLimit' && (
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
                <td colSpan={10} className="loading-cell">
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
                <td colSpan={10} className="no-data-cell">
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
                    <UserListItem value={row.user} />
                  </td>
                  <td className="table-cell numeric">
                    {row.Documenttype}
                  </td>
                  <td className="table-cell numeric">
                    {row.realname}
                  </td>
                  <td className="table-cell numeric">
                    {row.idnumer}
                  </td>

                  {/* Front of Certificate with Preview */}
                  <td className="table-cell">
                    {row && row.front && row?.front[0]?.downloadUrl && (
                      <div
                        className="image-preview-thumbnail"
                        onClick={() =>
                          openImagePreview(
                            row.front[0].downloadUrl,
                            `Front of Certificate - ${row.realname}`,
                          )
                        }
                      >
                        <img
                          src={row.front[0].downloadUrl}
                          style={{
                            height: '50px',
                            cursor: 'pointer',
                          }}
                          alt="Front document"
                          title="Click to view larger"
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Back of Certificate with Preview */}
                  <td className="table-cell">
                    { row && row.back && row?.back[0]?.downloadUrl && (
                      <div
                        className="image-preview-thumbnail"
                        onClick={() =>
                          openImagePreview(
                            row.back[0].downloadUrl,
                            `Back of Certificate - ${row.realname}`,
                          )
                        }
                      >
                        <img
                          src={row.back[0].downloadUrl}
                          style={{
                            height: '50px',
                            cursor: 'pointer',
                          }}
                          alt="Back document"
                          title="Click to view larger"
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    )}
                  </td>
                  {/* Selfie with Preview */}
                  <td className="table-cell">
                    {row && row.selfie && row?.selfie[0]?.downloadUrl && (
                      <div
                        className="image-preview-thumbnail"
                        onClick={() =>
                          openImagePreview(
                            row.selfie[0].downloadUrl,
                            `Selfie - ${row.realname}`,
                          )
                        }
                      >
                        <img
                          src={row.selfie[0].downloadUrl}
                          style={{
                            height: '50px',
                            cursor: 'pointer',
                          }}
                          alt="Selfie"
                          title="Click to view larger"
                        />
                        <div className="image-overlay">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    )}
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
                              onSubmit(
                                row.id,
                                'success',
                                row.user.id,
                              )
                            }
                          >
                            Pass
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() =>
                              onSubmit(
                                row.id,
                                'canceled',
                                row.user.id,
                              )
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
      <style>{`/* Image Preview Modal Styles */
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
}`}</style>
    </div>
  );
}

export default CouponsListTable;
