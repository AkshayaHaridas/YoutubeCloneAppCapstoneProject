import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "./CustomFetch";
import { Comments } from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stateContext } from "./App";
import { useContext } from "react";
import { VideoDetails } from "./VideoDetails";
import {
  faEdit,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
export const VideoDisplay = () => {
  const { click } = useContext(stateContext);
  const param = useParams().id;
  const [value, setComment] = useState("");
  const [border, setBorder] = useState(false);
  const [ishidden, setIshidden] = useState(true);
  const [inputEnabled, setInputEnabled] = useState(true);
  function handleInput() {
    setBorder(true);
    setInputEnabled(false);
  }
  function handleSave() {
    setInputEnabled(true);
    setBorder(false);
  }
  function handleAdd() {
    setIshidden(false);
  }
  // get video by videoId
  const [result, error] = useFetch(
    `http://localhost:2288/getSingleVideo/${param}`
  );
  // get other videos in that channel.So get channel info with channelId
  let id = null;
  if (result && result.channelId) {
    id = result.channelId;
  }
  const [channel, err] = useFetch(`http://localhost:2288/getChannel/${id}`);
  if (channel) {
    sessionStorage.setItem("channelName", channel);
  }
  console.log("channel information", channel);
  return (
    <div className={click ? "videoParent displayStill" : "videoParent"}>
      <div className="videoDiv">
        <div className="videoSubDiv">
          {" "}
          {result ? (
            <div className="videoMain">
              {console.log(result.thumbnailUrl)}

              <iframe
                className="vDisplay"
                src={result.thumbnailUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className="vTitle">{result.title}</div>
              <div className="videoDetailRow">
                {" "}
                <div className="vchannel">
                  {channel
                    ? channel.channelName ||
                      sessionStorage.getItem("channelName")
                    : ""}
                </div>
                <button>Subscribe</button>
                <div className="likeDislike">
                  <div className="likes">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{`${Math.floor(result.likes / 1000)}K`}</span>
                  </div>
                  <div className="bar"></div>
                  <div className="dislikes">
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>{result.dislikes}</span>
                  </div>
                </div>
              </div>

              <div className="vDescription">
                <div>{`${result.views} views`}</div>
                <div>{result.description}</div>
              </div>
              <div className="commentsDiv">
                <h1>Comments</h1>
                <h2>Add a comment:</h2>
                <div className="commentsAdd">
                  {" "}
                  <div>
                    {" "}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setComment(e.target.value)}
                    />{" "}
                    <button onClick={handleAdd}>Add</button>
                  </div>
                  <div>
                    {" "}
                    <input
                      value={value}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={inputEnabled}
                      hidden={ishidden}
                      style={
                        border
                          ? { border: "2px solid black" }
                          : { border: "0px" }
                      }
                    />{" "}
                    {ishidden === false && (
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={handleInput}
                        className="editIcon"
                      />
                    )}
                    {border ? <button onClick={handleSave}>Save</button> : null}
                    {console.log(err)}
                  </div>
                </div>

                {result.comments.map((x, index) => (
                  <Comments commentId={x} key={index} />
                ))}
              </div>
            </div>
          ) : (
            console.log("error in video fetch", error)
          )}
        </div>
        <div className="videoList">
          {channel && channel.videos.length !== 0 && (
            <>
              {channel.videos.map((videoId) => (
                <VideoDetails
                  videoId={videoId}
                  key={videoId}
                  channelName={channel.channelName}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
