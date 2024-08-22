import { useContext, useEffect, useState } from "react";
import "./index.less";
import { PlaygroundContext } from "../../ReactPlaygroundContext";
import FileItem from "./FileItem";
import { canDelete } from "../../files";

function FileList() {
  const { files, selectedFileName, setSelectedFile, updateFiles, addFile, removeFile } =
    useContext(PlaygroundContext);

  const [tabs, setTabs] = useState<string[]>([]);

  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    const fileIndex: string[] = new Array(Object.keys(files).length);
    Object.keys(files).forEach((key) => {
      const data = files[key];
      fileIndex[data.index - 1] = key;
    });
    setTabs(fileIndex.filter((f) => f));
  }, [files]);

  const updateFileName = (newName: string, preName: string) => {
    updateFiles(newName, preName);
    setSelectedFile(newName);
    setIsCreating(false);
  };

  const addTab = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(newFileName);
    setSelectedFile(newFileName);
    setIsCreating(true);
  };

  const handleDelete = (fileName: string) => {
    removeFile(fileName);
  }

  return (
    <div
      className="file_list_container"
      onWheel={(e) => {
        e.currentTarget.scrollLeft += e.deltaY;
      }}
    >
      {tabs.map((t, index) => {
        return (
          <FileItem
            key={t}
            name={t}
            isActive={t === selectedFileName}
            onActive={(name) => {
              setSelectedFile(name);
            }}
            updateFileName={updateFileName}
            isCreating={isCreating && index === tabs.length - 1}
            canDelete={canDelete(t) && t !== selectedFileName}
            handleDelete={handleDelete}
          />
        );
      })}

      <div className="add" onClick={addTab}>
        +
      </div>
    </div>
  );
}

export default FileList;
