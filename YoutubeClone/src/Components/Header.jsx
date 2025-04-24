import "../CSS/Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import {
  faCircleUser,
  faFile,
  faHistory,
  faHome,
  faMagnifyingGlass,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { stateContext } from "./App";

export const Header = () => {
  //toggle sidebar
  const { click, setClick, user } = useContext(stateContext);
  //dropdown to viewChannel
  const [clickChannel, setClickChannel] = useState(false);

  return (
    <>
      <div className="headerDiv">
        <div className="menuIcon" onClick={() => setClick(!click)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="youtube">
          <FontAwesomeIcon icon={faYoutube} />
          <div className="yt-text">YouTube</div>
        </div>
        <div className="search">
          <input type="text" className="input" placeholder="Search" />
          <div className="in-div">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        {/* createchannel if username */}
        <div>
          <Link to="/createChannel">Create new channel</Link>
        </div>
        <div className="signIn">
          {user && user.userName ? (
            <div
              onClick={() => setClickChannel(!clickChannel)}
              className="dropdown"
            >
              <FontAwesomeIcon icon={faCircleUser} className="iconUser" />
              {user.userName}
              {clickChannel ? (
                <div>
                  <Link to="/ViewChannel">View your Channel</Link>
                </div>
              ) : (
                console.log("user not defined")
              )}
            </div>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faCircleUser} className="iconUser" />
              Sign in
            </Link>
          )}{" "}
        </div>
      </div>
      {/* side bar toggle */}
      {click && (
        <div className="sidebar">
          <div className="homeIcon">
            {" "}
            <FontAwesomeIcon icon={faHome} className="iconSub" />
            Home
          </div>
          <div className="">
            {" "}
            <FontAwesomeIcon icon={faVideo} className="iconSub" />
            Shorts
          </div>
          <div className="">
            {" "}
            <FontAwesomeIcon icon={faFile} className="iconSub" />
            Subscriptions
          </div>
          <div className="">
            {" "}
            <FontAwesomeIcon icon={faUser} className="iconSub" />
            You
          </div>
          <div className="">
            {" "}
            <FontAwesomeIcon icon={faHistory} className="iconSub" />
            History
          </div>
        </div>
      )}
    </>
  );
};
