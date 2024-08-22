import { transform } from "@babel/standalone";
import type { Files, File } from "../../ReactPlaygroundContext";
import type { PluginObj } from "@babel/core";
import { ENTRY_FILE_NAME } from "../../files";

// 获取不同的文件内容

const getFileContent = (modulePath: string, files: Files): File => {
  const currentFileName = modulePath.split("./").pop() || "";
  if (currentFileName.indexOf(".") === -1) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith(".ts") ||
          key.endsWith(".tsx") ||
          key.endsWith(".js") ||
          key.endsWith(".jsx")
        );
      })
      .find((key) => {
        return key.split(".").includes(currentFileName);
      });
    if (realModuleName) {
      return files[realModuleName];
    }
  }

  return files[currentFileName];
};

const getJsonValue = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

const getCssValue = (file: File) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
  const stylesheet = document.createElement('style')
  stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
  document.head.appendChild(stylesheet)

  const styles = document.createTextNode(\`${file.value}\`)
  stylesheet.innerHTML = ''
  stylesheet.appendChild(styles)
})()
  `;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

const getCustomResolver = (files: Files): PluginObj => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        // 获取文件内容
        // 将不同的文件内容生成不同的东西
        const content = getFileContent(modulePath, files);
        if (content) {
          if (content.name.endsWith(".json")) {
            path.node.source.value = getJsonValue(content);
          } else if (content.name.endsWith(".css")) {
            path.node.source.value = getCssValue(content);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([transformCode(content.value, content.name, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
};

const insertImportReact = (code: string, fileName: string) => {
  let _code = code;
  const regexReact = /import\s+React/g;
  if (
    (fileName.endsWith(".jsx") || fileName.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};

export const transformCode = (code: string, fileName: string, files: Files) => {
  let result = "";
  const _code = insertImportReact(code, fileName);
  try {
    result = transform(_code, {
      presets: ["react", "typescript"],
      filename: fileName,
      plugins: [getCustomResolver(files)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.log("编译失败");
  }
  return result;
};

export const compileFile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return transformCode(main.value, ENTRY_FILE_NAME, files);
};

self.addEventListener("message", async ({ data }) => {
  console.log(data);
  try {
    self.postMessage({
      type: "COMPILED_CODE",
      data: compileFile(data),
    });
  } catch (e) {
    self.postMessage({ type: "ERROR", error: e });
  }
});
