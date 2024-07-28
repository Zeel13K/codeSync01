import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import '../Editor.css';

function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
    }
  }, []);

  return (
    <div>
      <textarea id="realtimeEditor">
        
      </textarea>
    </div>
  );
}

export default Editor;
