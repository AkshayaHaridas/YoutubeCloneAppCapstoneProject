import useFetch from "./CustomFetch";
export const VideoDetails = ({ videoId, channelName }) => {
  // get video by videoId
  const [result, error] = useFetch(
    `http://localhost:2288/getSingleVideo/${videoId}`
  );
  return (
    <>
      {result ? (
        <>
          {" "}
          <div className="videoDetails">
            {console.log(result.thumbnailUrl)}
            <video
              src={result.thumbnailUrl}
              controls
              autoPlay
              loop
              muted
              className="video"
            />
          </div>
          <div>{result.title}</div>
          <div>{channelName}</div>
          <div>{result.views}</div>
        </>
      ) : (
        console.log(error)
      )}
    </>
  );
};
