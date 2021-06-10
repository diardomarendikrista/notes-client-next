import styles from "../pages/index.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { setFormType, signin, alertError } from "../store/actions/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const login = async (event) => {
    event.preventDefault();
    if (email && password) {
      const user = {
        email,
        password,
      };
      setEmail("");
      setPassword("");
      const hasil = await dispatch(signin(user));
      if (hasil) router.push("/notes");
    } else {
      alertError("Cannot login", "Please fill email & password correctfully");
    }
  };
  
  const changeFormType = (value) => {
    dispatch(setFormType(value));
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={(event) => login(event)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button
          onClick={() => changeFormType("register")}
          variant="secondary"
          type="button"
          className={styles.btnToAnother}
        >
          Don't Have Account
        </Button>
      </Form>
    </>
  );
}