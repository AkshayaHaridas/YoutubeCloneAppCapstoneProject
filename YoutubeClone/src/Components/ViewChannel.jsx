import { useContext } from "react";
import { stateContext } from "./App";
import { VideoDetails } from "./VideoDetails";
import useFetch from "./CustomFetch";
import { Link } from "react-router-dom";

export const ViewChannel = () => {
  const { user } = useContext(stateContext);
  const [result, err] = useFetch("http://localhost:2288/getVideos");

  const [channel, error] = useFetch(
    `http://localhost:2288/getChannelById/${user._id}`
  );
  console.log(user, channel);
  return (
    <>
      {channel ? (
        <div className="viewChannelPage">
          <div className="name">{channel[0].channelName}</div>
          <div className="description">{channel[0].description}</div>
          <div>{channel[0].subscribers} subscribers</div>
          <button className="subscribe">Subscribe</button>
          <div className="colVideoList">
            {" "}
            <h2>Videos</h2>
            <div className="horizoBar"></div>
            <div className="viewVideo">
              {result
                ? result.map((video) => {
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
                          <div className="views">{video.views} views</div>
                          {console.log(video)}
                        </Link>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      ) : (
        console.log(error)
      )}
    </>
  );
};
