import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createATA } from "./ata";
import "./index.less";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface ViewProps {
  options?: editor.IStandaloneEditorConstructionOptions;
  onChange?: EditorProps["onChange"];
  file: EditorFile;
}

function CodeEdit(props: ViewProps) {
  const { options = {} } = props;
  const handleEditMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  return (
    <div className="code_edit_container">
      <MonacoEditor
        height="100%"
        path={props.file.name}
        language={props.file.language}
        value={props.file.value}
        onMount={handleEditMount}
        onChange={props.onChange}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          ...options,
        }}
      />
    </div>
  );
}

export default CodeEdit;
