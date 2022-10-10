
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";
import { NavBar } from "../components/NavBar";


export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(signUp(name, email, password));
  };

  return (
    <div>
      <NavBar/>
      <div style={{ textAlign: "center" }}>
        <h1>Sign Up</h1>
        <form onSubmit={submitForm}>
          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};


