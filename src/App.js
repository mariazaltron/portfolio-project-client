import './App.css';
import { Routes, Route } from "react-router-dom";
import { HomePage, Login, MyProfilePage, SeriesDetailsPage, SignUp } from "./pages"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series/:id" element={<SeriesDetailsPage />} />
        <Route path="/profile/:id" element={<MyProfilePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
