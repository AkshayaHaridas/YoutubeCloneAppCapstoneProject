import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./CustomFetch";
const HeaderSearchBtn = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, error] = useFetch("http://localhost:2288/getVideos");
  function searchVideo() {
    if (result) {
      const video = result.find((video) => video.title.includes(text));
      if (video) {
        console.log("searched video", video);
        navigate(`/VideoDisplay/${video.videoId}`);
      }
    } else {
      console.log("something went wrong", error);
    }
  }
  return (
    <div className="search">
      <input
        type="text"
        className="input"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="in-div">
        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={searchVideo} />
      </div>
    </div>
  );
};
export default HeaderSearchBtn;
