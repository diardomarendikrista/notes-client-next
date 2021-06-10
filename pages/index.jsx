import styles from "./index.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Home() {
  const formType = useSelector((state) => state.user.formType);
  const router = useRouter();

  useEffect(() => {
    // check local storage
    if (localStorage.getItem("access_token")) {
      router.push("/notes");
    }
  }, [router]);

  return (
    <Container fluid>
      <Head>
        <meta charSet="utf-8" />
        <title>Simple Note App</title>
        <link rel="Note app" href="" />
      </Head>

      <div className={styles.home}>
        <Row>
          <Col lg>
            <h1>Simple Note app</h1>
            <p>
              Register with easy-peasy way to get into our services. Our apps
              already encrypted with safe way and will not leak to another
              party. (yeah this is using JWT and Bcrypt)
            </p>
            <p>
              You can create, edit and delete your Note (okay, this is another
               CRUD app). honestly this is my Note version that I remake
              from my past project using Native PHP
            </p>
            <p>Hope you enjoy your day with Simple Note!!</p>
          </Col>
          <Col lg>{formType === "login" ? <Login /> : <Register />}</Col>
        </Row>
      </div>
    </Container>
  );
}
