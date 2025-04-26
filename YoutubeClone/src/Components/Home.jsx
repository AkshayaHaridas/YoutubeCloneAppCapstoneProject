import useFetch from "./CustomFetch";
import "../CSS/components.css";
import { stateContext } from "./App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";
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
      <FilterButtons categoryFun={categorise} />
      <div className={click ? "home homeNew" : "home"}>
        {result
          ? result && categoryFilter !== ""
            ? result
                .filter((video) => video.category == categoryFilter)
                .map((video) => {
                  return (
                    <div key={video.videoId} className="keyDivHome">
                      <Link to={`/VideoDisplay/${video.videoId}`}>
                        {" "}
                        <div className="imgDiv">
                          {console.log(video.thumbnailUrl)}
                          <video
                            src={video.thumbnailUrl}
                            width="560"
                            height="315"
                            controls
                            autoPlay
                            loop
                            muted
                          />
                        </div>
                        <div>{video.title}</div>
                        <div>
                          {channels
                            ? channels.find(
                                (x) => x.channelId === video.channelId
                              ).channelName || "Unknown Channel"
                            : channelErr}
                        </div>
                        <div>{video.views}</div>
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
                        <video
                          src={video.thumbnailUrl}
                          width="560"
                          height="315"
                          controls
                          autoPlay
                          loop
                          muted
                        />
                      </div>
                      <div>{video.title}</div>
                      <div>
                        {channels
                          ? channels.find(
                              (x) => x.channelId === video.channelId
                            ).channelName || "Unknown Channel"
                          : channelErr}
                      </div>
                      <div>{video.views}</div>
                      {console.log(video)}
                    </Link>
                  </div>
                );
              })
          : console.log(error)}
      </div>
    </>
  );
};

export default Home;
