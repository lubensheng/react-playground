import { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../../ReactPlaygroundContext";
// import { compileFile } from "./compile";
import CompilerWorker from "./compile.worker?worker";
import iframeUrl from "./preView.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import ErrorMessage from "../message/ErrorMessage";

function CodePreview() {
  const { files } = useContext(PlaygroundContext);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const getFileUrl = () => {
    const res = iframeUrl
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${code}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  const compileFileWork = useRef<Worker>();

  const [url, setUrl] = useState<string>(getFileUrl());

  useEffect(() => {
    setUrl(getFileUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, code]);

  useEffect(() => {
    if (!compileFileWork.current) {
      compileFileWork.current = new CompilerWorker();
      compileFileWork.current.addEventListener("message", ({data}) => {
        if (data.type === "COMPILED_CODE") {
          setCode(data.data);
        } else {
          //console.log('error', data);
        }
      });
    }
  }, []);
  useEffect(() => {
    // const code = compileFile(files);
    // setCode(code);
    compileFileWork.current?.postMessage(files);
  }, [files]);
  const handlePageError = (event: MessageEvent) => {
    const { type, message } = event.data;
    if (type === "ERROR") {
      setError(message);
    } else {
      setError("");
    }
  };

  useEffect(() => {
    window.addEventListener("message", handlePageError);
    return () => {
      window.removeEventListener("message", handlePageError);
    };
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={url}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      <ErrorMessage content={error} type="error" />
    </div>
  );
}

export default CodePreview;
