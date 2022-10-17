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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mylists" element={<MyLists />} />
        <Route path="/series/:id" element={<SeriesDetailsPage />} />
        <Route path="/profiles" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
