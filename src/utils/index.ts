export const getFileNameLanguage = (fileName: string) => {
  const suffix = fileName.split(".").pop() || "";
  if (["ts", "tsx"].includes(suffix)) {
    return "typescript";
  } else if (["js", "jsx"].includes(suffix)) {
    return "javascript";
  } else if (["json"].includes(suffix)) {
    return "json";
  } else if (["css"].includes(suffix)) {
    return "css";
  } else {
    return "javascript";
  }
};


