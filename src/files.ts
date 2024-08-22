import { Files } from "./ReactPlaygroundContext";
import { getFileNameLanguage } from "./utils";
import importMap from './template/import-map.json?raw'
import AppCss from './template/App.css?raw'
import App from './template/App.tsx?raw'
import main from './template/main.tsx?raw'


export const APP_FILE_NAME = "App.tsx";
export const IMPORT_MAP_FILE_NAME = "import-map.json";
export const ENTRY_FILE_NAME = "main.tsx";


export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: getFileNameLanguage(ENTRY_FILE_NAME),
    value: main,
    index: 1
  },
  [APP_FILE_NAME]: {
    name: APP_FILE_NAME,
    language: getFileNameLanguage(APP_FILE_NAME),
    value: App,
    index: 2
  },
  'App.css': {
    name: 'App.css',
    language: 'css',
    value: AppCss,
    index: 3
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: getFileNameLanguage(IMPORT_MAP_FILE_NAME),
    value: importMap,
    index: 4
  },
}

export const canDelete = (fileName: string) => {
  return (
    fileName !== APP_FILE_NAME &&
    fileName !== IMPORT_MAP_FILE_NAME &&
    fileName !== ENTRY_FILE_NAME
  );
};