import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function CouponsView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <TextViewItem
        label={i18n('entities.coupons.fields.title')}
        value={record.title}
      />

      <TextViewItem
        label={i18n('entities.coupons.fields.codeName')}
        value={record.codeName}
      />

      <TextViewItem
        label={i18n('entities.coupons.fields.discount')}
        value={record.discount}
      />

      <TextViewItem
        label={i18n('entities.coupons.fields.noOfTimes')}
        value={record.noOfTimes}
      />

      <TextViewItem
        label={i18n('entities.coupons.fields.status')}
        value={
          record.status &&
          i18n(
            `entities.coupons.enumerators.status.${record.status}`,
          )
        }
      />

      <TextViewItem
        label={i18n('entities.coupons.fields.type')}
        value={
          record.type &&
          i18n(
            `entities.coupons.enumerators.type.${record.type}`,
          )
        }
      />
    </ViewWrapper>
  );
}

export default CouponsView;
