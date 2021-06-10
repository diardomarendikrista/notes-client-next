import styles from "../index.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { Form, Button, Col, Row } from "react-bootstrap";
import { updateNoteAsync, fetchNoteAsync } from "../../../store/actions/note";
import Loading from "../../../components/Loading";

export default function NoteEdit() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { noteId } = router.query;

  const noteData = useSelector((state) => state.note.note);
  const loading = useSelector((state) => state.note.loading);
  const originPage = useSelector((state) => state.note.originPage);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  useEffect(() => {
    fetchEditNote();
    // eslint-disable-next-line
  }, [noteId]);

  const fetchEditNote = async () => {
    if (noteId) {
      const data = await dispatch(fetchNoteAsync(noteId));
      if (data) {
        setTitle(data.title);
        setNote(data.note);
        setTag(data.tag);
        setStatus(data.status);
      } else {
        router.push("/notes");
      }
    }
  };

  const updateNote = async (event) => {
    event.preventDefault();
    const updateNote = {
      id: noteId,
      title,
      note,
      tag,
      status,
    };
    // console.log(updateNote);
    await dispatch(updateNoteAsync(updateNote));
    // Menentukan redirect page (dari detail atau dari home)
    if (originPage === "home") router.push("/notes");
    if (originPage === "detail") router.push("/notes/" + updateNote.id);
    else router.push("/notes");
  };

  const toHome = () => {
    router.push("/notes");
  };

  if (loading || !noteData) return <Loading />;
  return (
    <div className={styles.container2}>
      <Head>
        <meta charSet="utf-8" />
        <title>Edit Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Head>

      <h3>
        <b>Edit Note</b>
      </h3>
      <Form onSubmit={(event) => updateNote(event)}>
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
