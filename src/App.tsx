import ReactPlayground from "./ReactPlayground";
import { PlaygroundProvider } from "./ReactPlaygroundContext";

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground></ReactPlayground>
    </PlaygroundProvider>
    
  );
}

export default App;
