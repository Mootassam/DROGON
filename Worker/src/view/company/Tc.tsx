import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/company/form/companyFormActions';
import listactions from 'src/modules/company/list/companyListActions';
import selectors from 'src/modules/company/list/companyListSelectors';
import Spinner from 'src/view/shared/Spinner';
function TC() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const [recordContent, setRecordContent] = useState('');

  const dispatch = useDispatch();

  const doSubmit = () => {
    const values = {
      tc: editorState.getCurrentContent().getPlainText(),
    };
    dispatch(actions.doCreate(values));
  };

  // const onEditorStateChange =(editorState) => {
  //   setEditorState(editorState);
  // }

  const doFetch = () => {
    dispatch(listactions.doFetch());
  };

  React.useEffect(() => {
 
  }, [editorState]);

  useEffect(() => {
    // Assuming record is an object with a property 'companydetails'
    if (record && record[0]?.tc) {
      setRecordContent(record[0].tc);
    }
  }, [record]);

  useEffect(() => {
    // Set the editorState with the content from the record
    doFetch();
    const contentState =
      ContentState.createFromText(recordContent);
    const newEditorState =
      EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [recordContent]);

  const onEditorStateChange = (newEditorState) => {
    // You can handle editor state changes here if needed
    setEditorState(newEditorState);
  };

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('company.menu'), '/company'],
          [i18n('company.TC')],
        ]}
      /> */}

      <ContentWrapper>
        {loading && <Spinner />}
        {!loading && record && (
          <Container fluid={true}>
            <Row>
              <Col xs={9}>
                <PageTitle>{i18n('company.TC')}</PageTitle>
              </Col>
              <Col md="auto">
                <button
                  className="btn  btn-primary "
                  disabled={false}
                  type="button"
                  style={{ width: 250 }}
                  onClick={() => doSubmit()}
                >
                  <ButtonIcon
                    loading={false}
                    iconClass="far fa-save"
                  />{' '}
                  &nbsp;
                  {i18n('common.save')}
                </button>
              </Col>
            </Row>

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
          </Container>
        )}
      </ContentWrapper>
    </>
  );
}

export default TC;
