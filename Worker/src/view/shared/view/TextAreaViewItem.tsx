import PropTypes from 'prop-types';
import React from 'react';

function TextAreaViewItem(props) {
  if (
    !props.value &&
    props.value !== 0 &&
    props.value !== false
  ) {
    return null;
  }

  const value = `${props.prefix ? `${props.prefix} ` : ''}${props.value
    }`;

  return (
    <div className="form-group">
      <label className="col-form-label">
        {props.label}
      </label>

      <textarea
        readOnly
        className="form-control-plaintext"
        value={value}
      />
    </div>
  );
}

TextAreaViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
};

export default TextAreaViewItem;
