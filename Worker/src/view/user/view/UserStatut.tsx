import { i18n } from 'src/i18n';
import React from 'react';

function UserStatut(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'actif') {
    return (
      <span className={`badge badge-success`}>
        {i18n('actif')}
      </span>
    );
  }

  if (value === 'inactif') {
    return (
      <span className={`badge badge-danger`}>
        {i18n('inactif')}
      </span>
    );
  }

  return (
    <span className={`badge badge-warning`}>
      {i18n('Supprimé')}
    </span>
  );
}

export default UserStatut;
