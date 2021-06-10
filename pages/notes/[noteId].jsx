import styles from './index.module.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { fetchNoteAsync, setOriginPage } from "../../store/actions/note";
import capitalize from "../../helpers/capitalize";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { noteId } = router.query;
  
  const note = useSelector(state => state.note.note);
  const loading = useSelector(state => state.note.loading);
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

  if (loading || !note) return <h1>Loading...</h1>
  return (
    <div className={styles.container2}>
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
