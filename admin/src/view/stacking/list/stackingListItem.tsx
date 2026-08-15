import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import selectors from 'src/modules/kyc/kycSelectors';

function StackingListItem(props) {
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );
  const valueAsArray = () => {
    const { value } = props;
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <Link
            className="btn btn-link"
            to={`/kyc/${record.id}`}
          >
          <span className='vip'>  {record.title} </span>
          </Link>
        </div>
      );
    }
    return <div key={record.id}>{record.title}</div>;
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
}

StackingListItem.propTypes = {
  value: PropTypes.any,
};

export default StackingListItem;
