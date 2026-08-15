import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';

function PaymentsettingsView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <TextViewItem
        label={i18n('entities.paymentsettings.fields.name')}
        value={record.name}
      />

      <TextViewItem
        label={i18n('entities.paymentsettings.fields.information')}
        value={record.information}
      />

      <TextViewItem
        label={i18n('entities.paymentsettings.fields.uniqueKeywords')}
        value={record.uniqueKeywords}
      />

      <ImagesViewItem
        label={i18n('entities.paymentsettings.fields.photo')}
        value={record.photo}
      />

      <TextViewItem
        label={i18n('entities.paymentsettings.fields.text')}
        value={record.text}
      />

      <TextViewItem
        label={i18n('entities.paymentsettings.fields.status')}
        value={
          record.status &&
          i18n(
            `entities.paymentsettings.enumerators.status.${record.status}`,
          )
        }
      />

      <TextViewItem
        label={i18n('entities.paymentsettings.fields.type')}
        value={record.type}
      />
    </ViewWrapper>
  );
}

export default PaymentsettingsView;
