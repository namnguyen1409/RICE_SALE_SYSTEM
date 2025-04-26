import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter"; // file này chứa các route bạn đã định nghĩa

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
