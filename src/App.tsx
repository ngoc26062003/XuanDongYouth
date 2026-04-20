import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import các trang đã được chuyển đổi
import Home from "./app/page";
import About from "./app/about/page";
import Exhibition from "./app/exhibition/page";
import ExhibitionDetail from "./app/exhibition/[id]/page";
import Login from "./app/login/page";
import Register from "./app/register/page";
import CourseDetail from "./app/courses/[id]/page";
import Stories from "./app/stories/page";
import StoryDetail from "./app/stories/[id]/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/exhibition/:id" element={<ExhibitionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}