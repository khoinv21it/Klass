import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
// import "antd/dist/reset.css";
import Route09 from "./Week02/Lesson09/Route09";
import TaskManagement from "./Week02/Lesson10";
import VercelDirect from "./Week02/VercelDirect";
import ExerciseRoute from "./Week03/Excercise/ExerciseRoute";
import Lesson13 from "./Week03/Lesson13";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VercelDirect />} />

        {/* Render Lesson09 app */}
        <Route path="/lesson09/*" element={<Route09 />} />

        {/* Render Lesson10 app */}
        <Route path="/lesson10/*" element={<TaskManagement />} />

        {/* Render Lesson13 app */}
        <Route path="/lesson13/*" element={<Lesson13 />} />

        <Route path="/exam/*" element={<ExerciseRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
