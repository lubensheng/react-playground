import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/headers/Header";
import CodeEdit from "./components/codeEdit/index";
import CodePreview from "./components/codePreview/CodePreview";
export default function ReactPlayground() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header />
      <div style={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={0}>
            <CodeEdit />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <CodePreview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}
