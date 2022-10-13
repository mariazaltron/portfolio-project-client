import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  Login,
  ProfilePage,
  SeriesDetailsPage,
  SignUp,
  MyLists,
  SearchResults,
} from "./pages";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mylists" element={<MyLists/>}/>
        <Route path="/series/:id" element={<SeriesDetailsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults/>}/>
      </Routes>
    </div>
  );
}

export default App;
