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
import { NavBar } from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { MessageBox } from "./components/MessageBox";
import {SharedPage} from "./pages/SharedPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <MessageBox />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mylists" element={<MyLists />} />
        <Route path="/serie/details" element={<SeriesDetailsPage />} />
        <Route path="/profiles" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/shared" element={<SharedPage />} />
      </Routes>
    </div>
  );
}

export default App;
