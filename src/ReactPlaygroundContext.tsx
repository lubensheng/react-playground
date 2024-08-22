import { createContext, PropsWithChildren, useState } from "react";
import { getFileNameLanguage } from "./utils";
import { APP_FILE_NAME, initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
  index: number;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContext {
  files: Files;
  addFile: (name: string) => void;
  removeFile: (fileName: string) => void;
  updateFiles: (newFileName: string, oldFileName: string) => void;
  selectedFileName: string;
  setSelectedFile: (fileName: string) => void;
  setFiles: (files: Files) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>(APP_FILE_NAME);

  const addFile = (name: string) => {
    const len = Object.keys(files).length;
    files[name] = {
      value: "",
      language: getFileNameLanguage(name),
      name,
      index: len + 1
    };
    setFiles({...files});
  };

  const setSelectedFile = (name: string) => {
    setSelectedFileName(name);
  };

  const updateFiles = (newFileName: string, oldFileName: string) => {
    if (
      !files[oldFileName] ||
      newFileName === undefined ||
      newFileName === null
    ) {
      return;
    }
    const { [oldFileName]: value, ...rest } = files;
    const newFile: Files = {
      [newFileName]: {
        ...value,
        name: newFileName,
        language: getFileNameLanguage(newFileName),
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  };

  const removeFile = (fileName: string) => {
    if (!files[fileName] || fileName === undefined || fileName === null) {
      return;
    }
    delete files[fileName];
    setFiles({ ...files });
  };


  
  return (
    <PlaygroundContext.Provider
      value={{
        files: files,
        addFile,
        selectedFileName,
        setSelectedFile,
        updateFiles,
        removeFile,
        setFiles
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
