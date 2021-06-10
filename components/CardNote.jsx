import styles from "./CardNote.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import capitalize from "../helpers/capitalize";
import { deleteNoteAsync, setOriginPage } from "../store/actions/note";

export default function CardNote({ note }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const detailNote = (id) => {
    router.push("/notes/" + id);
  };

  const editNote = (id) => {
    dispatch(setOriginPage("home"));
    router.push("/notes/edit/" + id);
  };

  const deleteNote = (id) => {
    dispatch(deleteNoteAsync(id));
  };

  return (
    <>
      <Card className={styles["card-note"]}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <div onClick={() => detailNote(note.id)}>
            <div>
              <p className={`${styles["text-title"]} text-left`}>{capitalize(note.title)}</p>
            </div>
            <div className={styles["text-note-size"]}>
              <p className={`${styles["p-note"]} text-left`}>{note.note}</p>
            </div>
            <div className={`${styles["text-readmore"]} text-left`}>
              <p>read more..</p>
            </div>
          </div>
          <div className={styles["btn-div"]}>
            <BsPencilSquare
              onClick={() => editNote(note.id)}
              className={styles["btn-edit"]}
            />
            <BsFillTrashFill
              onClick={() => deleteNote(note.id)}
              className={styles["btn-delete"]}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
