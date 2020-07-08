import * as React from 'react';
import * as DOMPurify from 'dompurify';
import * as marked from 'marked';
import styled from 'styled-components';

import { DocumentStorageLocalStorage } from 'web/services/document_storage/document_storage_localstorage';

const ScratchPadContainer = styled.div`
  margin-top: 16px;
  height:  300px;
  width:  100%;
`;

const sharedStyles = `
  width: 100%;

  box-sizing: border-box;
  border: 1px solid #E4E4E4;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  padding: 8px;
`;

const StyledButton = styled.button`
  margin-top: 16px;
`;

const StyledDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  ${sharedStyles}
`;

const StyledTextarea = styled.textarea<{height: number}>`
  ${sharedStyles}
  height: ${props => props.height}px;
  overflow: hidden;
  resize: none;
`;

const Preview = ({ rawContent, onClick }: {rawContent: string, onClick: () => void}) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const dirty = marked(rawContent);
    setContent(DOMPurify.sanitize(dirty));
  }, [rawContent]);

  return <React.Fragment>
    <StyledDiv dangerouslySetInnerHTML={{ __html: content }}/>
    <StyledButton onClick={onClick}>Edit</StyledButton>
  </React.Fragment>;
};

const Editor = ({ rawContent, onClick }: {rawContent: string, onClick: (content: string) => void}) => {
  const [content, setContent] = React.useState(rawContent);
  const [height, setHeight] = React.useState(0);
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  React.useEffect(() => {
    setHeight(textareaRef.current.scrollHeight);
    textareaRef.current.focus();
  }, [setHeight]);

  const onSave = () => onClick(content);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    setHeight(target.scrollHeight);
    setContent(target.value);
  };

  return <React.Fragment>
    <StyledTextarea height={height} value={content} onChange={onChange} ref={textareaRef}/>
    <StyledButton onClick={onSave}>Save</StyledButton>
  </React.Fragment>;
};

export const ScratchPad = () => {
  const [showEditor, setShowEditor] = React.useState(false);
  const [rawContent, setRawContent] = React.useState('');

  React.useEffect(() => {
    async function retrieveDocument() {
      const document = await DocumentStorageLocalStorage.retrieve();
      setRawContent(document);
    }

    retrieveDocument();
  }, []);

  const displayEditor = () => setShowEditor(true);

  const displayPreview = (content: string) => {
    DocumentStorageLocalStorage.save(content);
    setRawContent(content);
    setShowEditor(false);
  };

  return <ScratchPadContainer>
    {showEditor ? <Editor rawContent={rawContent} onClick={displayPreview}/> : <Preview rawContent={rawContent} onClick={displayEditor}/>}
  </ScratchPadContainer>;
};
