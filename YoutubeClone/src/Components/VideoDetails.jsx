import useFetch from "./CustomFetch";
export const VideoDetails = ({ videoId, channelName, styleEach }) => {
  // get video by videoId
  const [result, error] = useFetch(
    `http://localhost:2288/getSingleVideo/${videoId}`
  );
  return (
    <>
      {result ? (
        <div className="videoDetailParent">
          {" "}
          <div className={`videoDetails ${styleEach ? styleEach : ""}`}>
            <iframe
              src={result.thumbnailUrl}
              className="video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <div className="rightSection">
            {" "}
            <div className="rTitle">{result.title}</div>
            <div className="rChannel">{channelName}</div>
            <div className="rViews">{`${result.views} views`}</div>
          </div>
        </div>
      ) : (
        console.log(error)
      )}
    </>
  );
};
