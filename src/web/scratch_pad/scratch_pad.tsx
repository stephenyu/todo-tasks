import * as React from 'react';
import * as DOMPurify from 'dompurify';
import * as marked from 'marked';
import styled from 'styled-components';

import { DocumentStorage } from 'web/services/storage_document';

const ScratchPadContainer = styled.div`
  margin-top: 16px;
  height:  300px;
  width:  100%;
`;

const StyledDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  width: 100%;

  border: 1px solid #E4E4E4;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  padding: 8px;
`;

const StyledTextarea = styled.textarea`
  height: 100%;
  width: 100%;

  border: 1px solid #E4E4E4;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  padding: 8px;
`;

const Preview = ({ rawContent, onClick }: {rawContent: string, onClick: () => void}) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const dirty = marked(rawContent);
    setContent(DOMPurify.sanitize(dirty));
  }, [rawContent]);

  return <React.Fragment>
    <StyledDiv dangerouslySetInnerHTML={{ __html: content }}/>
    <button onClick={onClick}>Edit</button>
  </React.Fragment>;
};

const Editor = ({ rawContent, onClick }: {rawContent: string, onClick: (content: string) => void}) => {
  const [content, setContent] = React.useState(rawContent);
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  React.useEffect(() => textareaRef.current.focus());

  const onSave = () => onClick(content);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);

  return <React.Fragment>
    <StyledTextarea value={content} onChange={onChange} ref={textareaRef}/>
    <button onClick={onSave}>Save</button>
  </React.Fragment>;
};

export const ScratchPad = () => {
  const [showEditor, setShowEditor] = React.useState(false);
  const [rawContent, setRawContent] = React.useState('');

  React.useEffect(() => {
    async function retrieveDocument() {
      const document = await DocumentStorage.retrieve();
      setRawContent(document);
    }

    retrieveDocument();
  }, []);

  const displayEditor = () => setShowEditor(true);

  const displayPreview = (content: string) => {
    DocumentStorage.save(content);
    setRawContent(content);
    setShowEditor(false);
  };

  return <ScratchPadContainer>
    {showEditor ? <Editor rawContent={rawContent} onClick={displayPreview}/> : <Preview rawContent={rawContent} onClick={displayEditor}/>}
  </ScratchPadContainer>;
};
