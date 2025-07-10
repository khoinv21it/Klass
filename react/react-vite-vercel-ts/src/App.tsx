import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Route09 from "./Week02/Lesson09/Route09";
import TaskManagement from "./Week02/Lesson10";
import VercelDirect from "./Week02/VercelDirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VercelDirect />} />

        {/* Render Lesson09 app */}
        <Route path="/lesson09/*" element={<Route09 />} />

        {/* Render Lesson10 app */}
        <Route path="/lesson10/*" element={<TaskManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
