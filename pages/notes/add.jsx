import styles from './index.module.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from "react-bootstrap";
import { newNoteAsync } from "../../store/actions/note";

export default function NoteAdd() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const router = useRouter();

  const toHome = () => {
    router.push("/notes");
  }

  const createNewNote = async (event) => {
    event.preventDefault();
    const newNote = {
      title,
      note,
      tag,
      status,
    };
    // console.log(newNote);
    await dispatch(newNoteAsync(newNote));
    router.push("/notes");
  };

  return (
    <div className={styles.container2}>
      <h3>
        <b>New Note</b>
      </h3>
      <Form onSubmit={(event) => createNewNote(event)}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Note Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: Important notes"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="1">
            Tag
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="text"
              placeholder="Eg: Sports, Account"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button className="btn-submit" variant="primary" type="submit">
          Submit
        </Button>
        <Button onClick={() => toHome()} variant="secondary" type="button">
          Back
        </Button>
      </Form>
    </div>
  );
}
