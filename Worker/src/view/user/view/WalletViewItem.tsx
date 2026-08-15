import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function WalletViewItem(props) {
  const { user, loading } = props;

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <Row style={{ paddingBottom: '10px' }}>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.walletname')}
            value={user.walletname}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.usernamewallet')}
            value={user.usernamewallet}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.preferredcoin')}
            value={user.preferredcoin}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '10px' }}>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.erc20')}
            value={user.erc20}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.trc20')}
            value={user.trc20}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.withdrawPassword')}
            value={user.withdrawPassword ? user.withdrawPassword  : ''}
          />
        </Col>
      </Row>
    </ViewWrapper>
  );
}

export default WalletViewItem;