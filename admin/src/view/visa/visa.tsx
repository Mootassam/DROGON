import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authAxios from '../../modules/shared/axios/authAxios';
import ListNumberDuplicate from './ListNumberDuplicate';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import action from 'src/modules/numbers/numberActions';
import selectors from 'src/modules/numbers/numberSelectors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
function Numbers() {
  const [file, setFile] = useState<Blob>();
  const loading = useSelector(selectors.loading);
  const newNumber = useSelector(selectors.numberAdded);
  const numberDuplicated = useSelector(
    selectors.numberDuplicated,
  );
  const wrongnumbers = useSelector(selectors.numberWrong);
  const listwrongNumbers = useSelector(
    selectors.listwrongNumbers,
  );
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // Check if a file is selected
    if (!file) {
      Message.error(i18n(`dashboard.file`));
      return;
    }

    // Check if the file type is CSV
    if (file.type !== 'text/csv') {
      Message.error(i18n(`dashboard.typecsv`));
      return;
    }

    dispatch(action.doUploadFile(file));
  };

  const downloadCSV = () => {
    // Create a CSV content
    const csvContent = 'phone_Numbers';

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], {
      type: 'text/csv',
    });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the click event to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const reset = () => {
    dispatch(action.doClearfile());
  };

  useEffect(() => {
    dispatch(action.doClearfile());
  }, [dispatch]);

  return (
    <div className="seperate">
      <div className="">
        <div className="numbers__upload">
          <div className="counts__items">
            <div className="addedd">
              <span className="text__number">
                {newNumber > 0 ? newNumber : 0}
              </span>
              <label htmlFor="" className="text-lg">
                {i18n('dashboard.add')}
              </label>
            </div>
            <div className="addedd">
              <span className="text__number">
                {numberDuplicated > 0
                  ? numberDuplicated
                  : 0}
              </span>
              <label htmlFor="" className="text-lg">
                {i18n('dashboard.duplicated')}
              </label>
            </div>

            <div className="addedd">
              <span className="text__number">
                {wrongnumbers > 0 ? wrongnumbers : 0}
              </span>
              <label htmlFor="" className="text-lg">
                {i18n('dashboard.Wrong')}
              </label>
            </div>
          </div>

          <div className="pt-10 pb-5">
            <div className="handle__upload">
              <input
                type="file"
                name=""
                id=""
                onChange={handleFileChange}
              />

              <div
                className="download"
                onClick={() => downloadCSV()}
              >
                <i className="fas fa-download white"></i>
                <span> {i18n('dashboard.download')}</span>
              </div>
            </div>
          </div>

          <div className="group__button">
            <div
              className="btn-primary valider"
              onClick={() => handleUpload()}
            >
              {loading === true ? (
                <>
                  Please wait ...
                  <span className="spinner-border spinner-border-sm"></span>{' '}
                </>
              ) : (
                <>{i18n('dashboard.valider')}</>
              )}
            </div>
            <div
              className="btn-light reset"
              onClick={() => reset()}
            >
              {i18n('dashboard.reset')}
            </div>
          </div>

          {/* {success && <span className="bg-green-500"> Number added</span>} */}
        </div>
      </div>

      {listwrongNumbers.length > 0 && (
        <ListNumberDuplicate
          wrongNumbers={listwrongNumbers}
        />
      )}
    </div>
  );
}

export default React.memo(Numbers);
