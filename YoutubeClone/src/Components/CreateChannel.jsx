import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const CreateChannel = () => {
  const [upload, setUpload] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [description, setdescription] = useState("");
  const [mess, setMess] = useState("");
  //find the user using the details in localstorage.
  async function user() {
    try {
      const response = await fetch(`http://localhost:2288/user`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${localStorage.getItem("token")}`,
        },
      });
      const res = await response.json();
      console.log("user", res);
      return res;
    } catch (error) {
      console.log("usererror", error);
    }
  }
  async function handleClick() {
    try {
      if (!description || !channelName) {
        setMess("all fields are mandatory");
      }
      const userInfo = await user();
      if (userInfo) {
        const channel = await fetch("http://localhost:2288/createChannel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            owner: userInfo.userId,
            description: description,
            channelName: channelName,
          }),
        });
        if (channel.ok) {
          const _channel = await channel.json();
          console.log("after channel created", _channel);
          setMess("channel created successfully");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="createChannel">
      <div className="iconcc">
        <FontAwesomeIcon
          icon={faCircleUser}
          onClick={() => setUpload(!upload)}
          className="iconCreateChannel"
        />
        {upload ? (
          <div className="fileUpload">
            <input type="file" />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="inputCh">
        <label>Channel Name</label>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
      </div>
      <div className="inputCh">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div className="btnCh">
        <button onClick={handleClick}>Create Channel</button>
      </div>
      {mess ? <div className="successMess">{mess}</div> : ""}
    </div>
  );
};
