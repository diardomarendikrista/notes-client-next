import styles from './index.module.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from 'next/head'
import { BsFillPlusSquareFill } from "react-icons/bs";
import CardNote from "../../components/CardNote";
import Loading from "../../components/Loading";
import capitalize from "../../helpers/capitalize";
import { fetchNotes } from "../../store/actions/note";
import { fetchProfile } from "../../store/actions/user";

export default function Notes() {
  const profile = useSelector((state) => state.user.profile);
  const notes = useSelector((state) => state.note.notes);
  const loading = useSelector((state) => state.note.loading);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // check local storage
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    } else {
      // load notes
      dispatch(fetchNotes());
      dispatch(fetchProfile());
    }
    // eslint-disable-next-line
  }, []);

  const addNote = () => {
    router.push("/notes/add");
  };

  const noNote = () => {
    return (
      <div className={styles["div-no-note"]}>
        <h3>No notes yet</h3>
        <p>tap on the +New Note to create new note</p>
      </div>
    );
  };

  if (loading || Object.keys(profile).length === 0) return <Loading />
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Head>

      <div className={styles["note-container"]}>
        <div>
          <h3 className={styles["title"]}>{capitalize(profile.name)}'s note</h3>
        </div>
        <div className={styles["add-btn"]}>
          <button onClick={() => addNote()} className="btn btn-primary">
            <BsFillPlusSquareFill /> new note
          </button>
        </div>
        <div className={styles["note-list"]}>
          <center>
            {notes.length < 1
              ? noNote()
              : notes.map((note) => <CardNote note={note} key={note.id} />)}
          </center>
        </div>
      </div>
    </div>
  );
}
