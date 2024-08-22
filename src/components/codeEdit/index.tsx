import { useContext } from "react";
import FileList from "../fileList/FileList";
import CodeEdit from "./CodeEdit";
import { PlaygroundContext } from "../../ReactPlaygroundContext";
import { debounce } from "lodash-es";

function View() {
  const { selectedFileName, files, setFiles } = useContext(PlaygroundContext);
  const file = files[selectedFileName];

  const onChange = (value?: string) => {
    files[selectedFileName].value = value!;
    setFiles({ ...files });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileList />
      <CodeEdit
        file={file}
        onChange={debounce(onChange, 500)}
      />
    </div>
  );
}

export default View;
