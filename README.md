# 基于react + monaco-editor/react 实现的react代码在线预览

## 技术亮点
1. 基于babel插件将源代码进行编译结合base64 和 importmap 实现代码预览
2. 结合webWorker实现编译性能优化
3. 通过postMessage实现两个页面通信