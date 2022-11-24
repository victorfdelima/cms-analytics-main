import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { Box } from '@mui/material';

import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const WYSIWYGEditor = ({ onChange, value, error }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      try {
        const defaultValue = value ? value : '';
        const blocksFromHtml = htmlToDraft(defaultValue);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        );

        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      } catch (error) {
        console.log('useEffectError', error);
      }
    }
  }, [value, updated]);

  const onEditorStateChange = editorState => {
    try {
      setUpdated(true);
      setEditorState(editorState);

      return onChange(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        my: 3,
        border: `1px solid ${error ? 'red' : '#ced4da'}`,
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <div className='editor'>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          localization={{
            locale: 'pt',
          }}
        />
      </div>
    </Box>
  );
};
