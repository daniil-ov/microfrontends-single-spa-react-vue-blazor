import React, { useEffect, useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import { EditorState, convertToRaw, ContentState } from 'draft-js';


const DraftEditor = function () {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [isSave, setIsSave] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:7777/api/document?id_doc=1').then((response) => {
            const contentBlock = htmlToDraft(response.data['text']);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState))
        });
    }, [])

    function onEditorStateChange(editorState) {
        setEditorState(editorState);
    }

    function saveText() {
        setIsSave(false);
        axios.post('http://localhost/api/document?id_doc=1', {
            text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
            .then((response) => {
                setIsSave(true);
        });

    }

    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                localization={{
                    locale: 'ru'
                }}
            />
            <textarea style={{width: '100%'}}
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            <button className={"button_react"} onClick={() => saveText()} disabled={!isSave}>Сохранить</button>
        </div>
    );

}

export default DraftEditor;