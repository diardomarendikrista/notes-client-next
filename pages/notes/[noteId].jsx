import styles from "./index.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "react-bootstrap";
import { fetchNoteAsync, setOriginPage } from "../../store/actions/note";
import Loading from "../../components/Loading";
import capitalize from "../../helpers/capitalize";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { noteId } = router.query;

  const note = useSelector((state) => state.note.note);
  const loading = useSelector((state) => state.note.loading);
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  const fetchNote = async () => {
    if (noteId) {
      const data = await dispatch(fetchNoteAsync(noteId));
      if (!data) {
        router.push("/notes");
      }
    }
  };

  const editNote = (id) => {
    dispatch(setOriginPage("detail"));
    router.push("/notes/edit/" + id);
  };

  const toHome = () => {
    router.push("/notes");
  };

  if (loading || Object.keys(note).length === 0) return <Loading />;
  else
    return (
      <div className={styles.container2}>
        <Head>
          <meta charSet="utf-8" />
          <title>Detail Note - Simple Note App</title>
          <link rel="Note app" href="" />
        </Head>

        <h3>
          <b>{capitalize(note.title)}</b>
        </h3>
        <p>
          {note.note.split("\n").map(function (item, idx) {
            return (
              <span key={idx}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
        <p>tag : {note.tag}</p>
        <Button
          onClick={() => editNote(note.id)}
          className="btn-submit"
          variant="info"
          type="submit"
        >
          Edit
        </Button>
        <Button onClick={() => toHome()} variant="secondary" type="button">
          Back
        </Button>
      </div>
    );
}
