import { useEffect, useState } from "react";
import useFetch from "./CustomFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faSave,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
export const Comments = ({ commentId }) => {
  const [value, setComment] = useState("");
  const [border, setBorder] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(true);
  const [comment, err] = useFetch(
    `http://localhost:2288/getCommentById/${commentId}`
  );
  useEffect(() => {
    if (comment && comment.text) {
      setComment(comment.text);
    }
  }, [comment]);
  function handleInput() {
    setBorder(true);
    setInputEnabled(false);
  }
  function handleSave() {
    setInputEnabled(true);
    setBorder(false);
  }
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setComment(e.target.value)}
        disabled={inputEnabled}
        style={border ? { border: "2px solid black" } : { border: "0px" }}
      />
      <FontAwesomeIcon icon={faEdit} onClick={handleInput} />
      {border ? <button onClick={handleSave}>Save</button> : null}
      {err}
    </div>
  );
};
