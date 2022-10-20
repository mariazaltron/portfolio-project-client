
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";
import { Input, Title, LinkWord } from "../styled";
import { Button } from "react-bootstrap"



export const Login = () => {
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
    dispatch(login(email, password));
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Container>
          <Title>Login</Title>
          <form onSubmit={submitForm} className="form-login-signup">
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button variant="dark" type="submit">
              Login
            </Button>
          </form>
          <SubText>
            Don't have an account yet? Click{" "}
            <Link to="/signup" style={LinkWord}>
              here
            </Link>{" "}
            to sign up
          </SubText>
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`

const SubText = styled.p`
  text-align: center;
  color: black;
  padding: 20px 0px 5px 0px;
`;


