import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/python/python';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: getModeForLanguage(language),
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();

        // Cleanup
        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea(); // Destroy the Codemirror instance
            }
        };
    }, []); // Reinitialize editor when language changes

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    // Function to get Codemirror mode based on selected language
    const getModeForLanguage = (language) => {
        switch (language) {
            case 'html':
                return 'htmlmixed';
            case 'javascript':
                return { name: 'javascript', json: true };
            case 'python':
                return 'python';
            default:
                return 'javascript';
        }
    };

    // Handle language change
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
    };

    return (
        <div className="editor-container">
            <div className="language-selector">
                <label htmlFor="language-select" className='language-heading'>Choose a language:
                <select
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="html">HTML</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
                </label>
              

                <button className="runBtn">
                    <i class="fa-solid fa-play"></i>  
                     Run
                </button>

            </div>
            <textarea id="realtimeEditor"></textarea>
        </div>
    );
};

export default Editor;