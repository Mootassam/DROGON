import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BankViewItem(props) {
  const { user, loading } = props;

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <Row style={{ paddingBottom: '10px' }}>
        <Col sm={3}>
          <TextViewItem
            label={i18n('user.fields.accountHolder')}
            value={user.accountHolder}
          />
        </Col>
        <Col sm={3}>
          <TextViewItem
            label={i18n('user.fields.bankName')}
            value={user.bankName}
          />
        </Col>
        <Col sm={3}>
          <TextViewItem
            label={i18n('user.fields.ibanNumber')}
            value={user.ibanNumber}
          />
        </Col>
        <Col sm={3}>
          <TextViewItem
            label={i18n('user.fields.ifscCode')}
            value={user.ifscCode}
          />
        </Col>
      </Row>
    </ViewWrapper>
  );
}

export default BankViewItem;