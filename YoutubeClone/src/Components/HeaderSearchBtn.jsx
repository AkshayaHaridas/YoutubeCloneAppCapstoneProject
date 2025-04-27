import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./CustomFetch";
const HeaderSearchBtn = () => {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, error] = useFetch("http://localhost:2288/getVideos");
  function changeInput(e) {
    setErr("");
    setText(e.target.value);
  }
  function searchVideo() {
    if (text === "") {
      return;
    }
    if (result) {
      const video = result.find((video) =>
        video.title.toLowerCase().includes(text.toLowerCase())
      );
      if (video) {
        console.log("searched video", video);
        navigate(`/VideoDisplay/${video.videoId}`);
      } else {
        setErr("video does not exist");
      }
    } else {
      console.log("something went wrong", error);
    }
  }
  return (
    <div className="searchDiv">
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={text}
          onChange={(e) => changeInput(e)}
        />
        <div className="in-div">
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={searchVideo} />
        </div>
      </div>
      {err ? <div className="errMess">{err}</div> : ""}
    </div>
  );
};
export default HeaderSearchBtn;
