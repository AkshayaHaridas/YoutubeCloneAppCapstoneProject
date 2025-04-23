import { useParams } from "react-router-dom";
import useFetch from "./CustomFetch";
import { Comments } from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClover,
  faLink,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
export const VideoDisplay = () => {
  const param = useParams().id;
  const [result, error] = useFetch(
    `http://localhost:2288/getSingleVideo/${param}`
  );

  return (
    <div className="videoParent">
      <div className="videoDiv">
        <div>
          {" "}
          {result ? (
            <div className="videoMain">
              {console.log(result.thumbnailUrl)}
              <video
                className="vDisplay"
                src={result.thumbnailUrl}
                controls
                autoPlay
                loop
                muted
              />
              <div className="vTitle">{result.title}</div>
              <button>Subscrible</button>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{result.likes}</span>
              <FontAwesomeIcon icon={faThumbsDown} />
              <span>{result.dislikes}</span>

              <div className="vDescription">
                <div>{result.views}</div>
                <div>{result.description}</div>
              </div>
              <div>
                <h1>Comments</h1>
                {result.comments.map((x, index) => (
                  <Comments commentId={x} key={index} />
                ))}
              </div>
            </div>
          ) : (
            console.log("error in video fetch", error)
          )}
        </div>

        <div className="videoList"></div>
      </div>
    </div>
  );
};
