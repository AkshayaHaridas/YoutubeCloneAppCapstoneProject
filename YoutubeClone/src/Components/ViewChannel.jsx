import { useContext } from "react";
import { stateContext } from "./App";
import { VideoDetails } from "./VideoDetails";
import useFetch from "./CustomFetch";

export const ViewChannel = () => {
  const { user } = useContext(stateContext);
  const [channel, error] = useFetch(
    `http://localhost:2288/getChannel/${user.channels[0]}`
  );
  console.log(user, channel);
  return (
    <>
      {channel ? (
        <div className="viewChannel">
          <div>{channel.description}</div>
          <div>{channel.channelName}</div>
          <div>{channel.subscribers}</div>
          <h2>Videos</h2>
          <div className="viewVideo">
            {channel.videos
              ? channel.videos.map((video) => {
                  return (
                    <div key={video}>
                      <VideoDetails
                        videoId={video}
                        channelName={channel.channelName}
                        styleEach="rowVideos"
                      />
                    </div>
                  );
                })
              : console.log(error)}
          </div>
        </div>
      ) : (
        console.log(error)
      )}
    </>
  );
};
