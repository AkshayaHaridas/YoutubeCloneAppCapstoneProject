import { useEffect, useState } from "react";
import useFetch from "./CustomFetch";

export const Comments = ({ commentId }) => {
  const [text, setText] = useState("");

  const [comment, err] = useFetch(
    `http://localhost:2288/getCommentById/${commentId}`
  );
  useEffect(() => {
    if (comment && comment.text) {
      setText(comment.text);
    }
  }, [comment]);

  return (
    <div className="commentText">
      <div>{text}</div>
      {console.log(err)}
    </div>
  );
};
