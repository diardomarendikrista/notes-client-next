import styles from "../pages/index.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setFormType, signup } from "../store/actions/user";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const dispatch = useDispatch();

  const register = async (event) => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    if (password === passwordRepeat) {
      const result = await dispatch(signup(newUser));
      if (result) {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordRepeat("");
      }
    } else {
      alert("Password didn't match");
      return false;
    }
  };

  const changeFormType = (value) => {
    dispatch(setFormType(value));
  };

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={(event) => register(event)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

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
        <Form.Group controlId="formBasicPassword2">
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            value={passwordRepeat}
            onChange={(event) => setPasswordRepeat(event.target.value)}
          />
          <Form.Text className="text-muted">
            Password section already well encrypted (using Bcrypt) and will
            never leak.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
        <Button
          onClick={() => changeFormType("login")}
          variant="secondary"
          type="button"
          className={styles.btnToAnother}
        >
          Already Have Account
        </Button>
      </Form>
    </>
  );
}
