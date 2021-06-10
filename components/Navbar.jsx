import styles from "./Navbar.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Form, NavDropdown } from "react-bootstrap";

export default function Navibar() {
  const [menuHidden, setMenuHidden] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") setMenuHidden(true);
    else setMenuHidden(false);
  }, [router.pathname]);

  const goHome = (event) => {
    event.preventDefault();
    router.push("/notes");
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    router.push("/");
  };

  return (
    <Navbar bg="info" variant="dark" className="navbar">
      <Navbar.Brand onClick={(event) => goHome(event)} href="/#">
        <img
          alt=""
          src="/assets/img/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Simple Note App
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Form inline>
        {" "}
        <NavDropdown
          title="Main Menu"
          id="navbarScrollingDropdown"
          className={styles.navbarScrollingDropdown}
          hidden={menuHidden}
        >
          <NavDropdown.Item>Action</NavDropdown.Item>
          <NavDropdown.Item>Action 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={(event) => logout(event)} href="/#">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Form>
    </Navbar>
  );
}
