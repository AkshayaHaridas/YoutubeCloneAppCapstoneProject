import useFetch from "./CustomFetch";
import "../CSS/components.css";
import { stateContext } from "./App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faVideo,
  faUser,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const { click } = useContext(stateContext);
  //get videos from custom fetch
  const [result, error] = useFetch("http://localhost:2288/getVideos");
  const [channels, channelErr] = useFetch("http://localhost:2288/getChannels");
  //set the value of category on filterbtn selection
  const [categoryFilter, setCategoryFilter] = useState("");
  function categorise(category) {
    setCategoryFilter(category);
  }
  return (
    <>
      <div className="parentHome">
        {click == false && (
          <div className="smallSideBar">
            <div className="iconDiv">
              <FontAwesomeIcon icon={faHome} className="iconSub" />
              <p>Home</p>
            </div>
            <div className="iconDiv">
              <FontAwesomeIcon icon={faVideo} className="iconSub" />
              <p>Shorts</p>
            </div>
            <div className="iconDiv">
              <FontAwesomeIcon icon={faFile} className="iconSub" />
              <p>Subscriptions</p>
            </div>
            <div className="iconDiv">
              <FontAwesomeIcon icon={faUser} className="iconSub" />
              <p>You</p>
            </div>
          </div>
        )}
        <div className="subParentHome">
          <FilterButtons categoryFun={categorise} />{" "}
          <div className={click ? "home homeNew" : "home"}>
            {result
              ? result && categoryFilter !== "" && categoryFilter !== "All"
                ? result
                    .filter((video) => video.category == categoryFilter)
                    .map((video) => {
                      return (
                        <div key={video.videoId} className="keyDivHome">
                          <Link to={`/VideoDisplay/${video.videoId}`}>
                            {" "}
                            <div className="imgDiv">
                              {console.log(video.thumbnailUrl)}
                              <iframe
                                src={video.thumbnailUrl}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                              />
                            </div>
                            <div className="title">{video.title}</div>
                            <div className="channel">
                              {channels
                                ? channels.find(
                                    (x) => x.channelId === video.channelId
                                  ).channelName || "Unknown Channel"
                                : channelErr}
                            </div>
                            <div className="views">{video.views} views</div>
                            {console.log(video)}
                          </Link>
                        </div>
                      );
                    })
                : result.map((video) => {
                    return (
                      <div key={video.videoId} className="keyDivHome">
                        <Link to={`/VideoDisplay/${video.videoId}`}>
                          {" "}
                          <div className="imgDiv">
                            {console.log(video.thumbnailUrl)}
                            <iframe
                              src={video.thumbnailUrl}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </div>
                          <div className="title">{video.title}</div>
                          <div className="channel">
                            {channels
                              ? channels.find(
                                  (x) => x.channelId === video.channelId
                                ).channelName || "Unknown Channel"
                              : channelErr}
                          </div>
                          <div className="views">{video.views} views</div>
                          {console.log(video)}
                        </Link>
                      </div>
                    );
                  })
              : console.log(error)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
