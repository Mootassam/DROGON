import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import authAxios from 'src/modules/shared/axios/authAxios';
import Message from 'src/view/shared/message';

function Check() {
  const [number, setNumber] = useState('');
  const SubmitNumber = () => {
    if (!number || number === '0') {
      Message.error(i18n(`dashboard.numberValidation`));
    } else {
      authAxios
        .post('/number/add', { number: number })
        .then((res) => {
          Message.success(i18n(`dashboard.Success`));

          Message.success(i18n(`dashboard.validation`));
        })
        .catch((error) => {
          Message.error(error.response.data);
        });
    }
  };
  const handleNumericInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^(\|-)?\d*$/g.test(inputValue);
    if (isValidInput) {
      setNumber(inputValue);
    } else {
      Message.error(i18n(`dashboard.validation`));
    }
  };

  const searchNumber = () => {
    if (!number || number === '0') {
      Message.error(i18n(`dashboard.numberValidation`));
    } else {
      authAxios
        .post('/number/check', { number: number })
        .then((res) => {
          Message.error(i18n(`dashboard.notFound`));
          // i18n('user.fields.rememberMe')
        })
        .catch((error) => {
          Message.error(error.response.data);
        });
    }
  };
  return (
    <div className="check__number">
      <div className="form--group">
        <label htmlFor="">{i18n('dashboard.labelphone')}</label>
        <input
          type="search"
          name=""
          id=""
          className="form-control full"
          value={number}
          onChange={handleNumericInputChange}
        />
      </div>

      <div className="group__check">
        <div
          className="btn btn-primary "
          onClick={() => searchNumber()}
        >
         {i18n('dashboard.check')}
        </div>
        <div
          className="btn btn-primary "
          onClick={() => SubmitNumber()}
        >
           {i18n('dashboard.add')}
        </div>
      </div>
    </div>
  );
}

export default Check;
