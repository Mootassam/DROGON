import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';

function CategoryView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <TextViewItem
        label={i18n('entities.category.fields.name')}
        value={record.name}
      />

      <TextViewItem
        label={i18n('entities.category.fields.slug')}
        value={record.slug}
      />

      <ImagesViewItem
        label={i18n('entities.category.fields.photo')}
        value={record.photo}
      />

      <TextViewItem
        label={i18n('entities.category.fields.metaKeywords')}
        value={record.metaKeywords}
      />

      <TextViewItem
        label={i18n('entities.category.fields.metaDescriptions')}
        value={record.metaDescriptions}
      />

      <TextViewItem
        label={i18n('entities.category.fields.status')}
        value={
          record.status &&
          i18n(
            `entities.category.enumerators.status.${record.status}`,
          )
        }
      />

      <TextViewItem
        label={i18n('entities.category.fields.isFeature')}
        value={
          record.isFeature
            ? i18n('common.yes')
            : i18n('common.no')
        }
      />

      <TextViewItem
        label={i18n('entities.category.fields.serial')}
        value={record.serial}
      />
    </ViewWrapper>
  );
}

export default CategoryView;
