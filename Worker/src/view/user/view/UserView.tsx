import React from 'react';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserStatut from 'src/view/user/view/UserStatut';
import ViewWrapper from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserView(props) {
  const { user, loading } = props;

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      <Row
        style={{
          paddingBottom: '10px',
        }}
      >
        <Col sm={4}>
          <TextViewItem
            label={i18n('user.fields.email')}
            value={user.email}
          />
        </Col>
        <Col sm={4}>
          <CustomViewItem
            label={i18n('user.fields.roles')}
            value={user.roles}
            render={(value) =>
              value.map((roleId) => (
                <div key={roleId}>
                  <span>{Roles.labelOf(roleId)}</span>
                </div>
              ))
            }
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Phone Number')}
            value={user.phoneNumber}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Date Create account')}
            value={user.createdAt}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Invitation Code')}
            value={user.invitationcode}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('country')}
            value={user.country}
          />
        </Col>
      </Row>

      <Row
        style={{
          paddingBottom: '10px',
        }}
      >
        <Col sm={4}>
          {user.date_naissance && (
            <TextViewItem
              label={i18n('date naissance')}
              value={moment(user.date_naissance).format(
                'DD-MM-YYYY',
              )}
            />
          )}
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Adresse')}
            value={user.adresse}
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('C.I.N')}
            value={user.cin}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Etat Civil')}
            value={
              user.etat_civil && i18n(`${user.etat_civil}`)
            }
          />
        </Col>
        <Col sm={4}>
          <TextViewItem
            label={i18n('Lien Facebook')}
            value={user.lien_facebook}
          />
        </Col>
        <Col sm={4}>
          <ImagesViewItem
            label={i18n('user.fields.avatars')}
            value={user.avatars}
          />
        </Col>
      </Row>

      <Row
        style={{
          paddingBottom: '10px',
        }}
      >
        <Col sm={4}>
          {user.parrain ? (
            <TextViewItem
              label={i18n('Parrain')}
              value={user.parrain.email}
            />
          ) : null}
        </Col>
        <Col sm={4}>
          <CustomViewItem
            label={i18n('Statut')}
            value={user.stat}
            render={(value) => <UserStatut value={value} />}
          />
        </Col>
        <Col sm={4}></Col>
      </Row>
    </ViewWrapper>
  );
}

export default UserView;
