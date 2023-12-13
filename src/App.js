import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import {Home, Login, Text, Question, Test} from "./page";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/question/:id" element={<Question />}/>
        <Route path="/text/:id" element={<Text />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </div>
  );
}
