import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function TransactionView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <TextViewItem
        label={i18n('entities.transaction.fields.title')}
        value={record.title}
      />

      <TextViewItem
        label={i18n('entities.transaction.fields.codeName')}
        value={record.codeName}
      />

      <TextViewItem
        label={i18n('entities.transaction.fields.discount')}
        value={record.discount}
      />

      <TextViewItem
        label={i18n('entities.transaction.fields.noOfTimes')}
        value={record.noOfTimes}
      />

      <TextViewItem
        label={i18n('entities.transaction.fields.status')}
        value={
          record.status &&
          i18n(
            `entities.transaction.enumerators.status.${record.status}`,
          )
        }
      />

      <TextViewItem
        label={i18n('entities.transaction.fields.type')}
        value={
          record.type &&
          i18n(
            `entities.transaction.enumerators.type.${record.type}`,
          )
        }
      />
    </ViewWrapper>
  );
}

export default TransactionView;
