import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../Utilities/Firebase";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";

function Chat() {
  useEffect(() => {
    GetChats();
  }, []);
  

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState("");
  const [oid, setOid] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [load, setLoad] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function GetChats() {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
      const querySnapshot = await getDocs(collection(db, "user"));
      querySnapshot.forEach((doc) => {
        let f = users.find((u) => u.id === doc.id);
        if (!f) {
          const obj = {
            id: doc.id,
            name: doc.data().userName,
            image: doc.data().userImage,
          };
          users.push(obj);
          setUsers([...users]);
        }
      });

      // Add listener for real-time updates
      const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let f = users.find((u) => u.id === change.doc.id);
            if (!f) {
              const obj = {
                id: change.doc.id,
                name: change.doc.data().userName,
                image: change.doc.data().userImage,
              };
              users.push(obj);
              setUsers([...users]);
            }
          }
          if (change.type === "modified") {
            let index = users.findIndex((u) => u.id === change.doc.id);
            if (index !== -1) {
              users[index] = {
                id: change.doc.id,
                name: change.doc.data().userName,
                image: change.doc.data().userImage,
              };
              setUsers([...users]);
            }
          }
          if (change.type === "removed") {
            let index = users.findIndex((u) => u.id === change.doc.id);
            if (index !== -1) {
              users.splice(index, 1);
              setUsers([...users]);
            }
          }
        });
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  async function GetMessages(id) {
    try {
      const userRef = await getDocs(collection(db, "user", id, "orders"));
      for (const u of userRef.docs) {
        setOid(u.id);
        const messageref = query(
          collection(db, "user", id, "orders", u.id, "messages"),
          orderBy("createdOn", "asc")
        );

        // Add listener for real-time updates
        const unsubscribe = onSnapshot(messageref, (snapshot) => {
          const newMessages = [];
          snapshot.forEach((message) => {
            newMessages.push(message.data());
          });
          setMessages(newMessages);
        });
      }
    } catch (error) {
      console.error("Error getting messages: ", error);
    }
  }

  const UploadImage = async () => {
    try {
      const formdata = new FormData();
      formdata.append("image", img);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseurl}driver/api/uploadImage`,
        requestOptions
      );
      const result = await response.json();

      return result.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  function RenderChat() {
    return messages.map((message) => {
      if (message.msgBy === 0) {
        if (message.message !== "") {
          return (
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">
                  {new Date(
                    message.createdOn.seconds * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">You</span>{" "}
                <i className="fa fa-circle me" />
              </div>
              <div className="message other-message float-right">
                {message.message}
              </div>
            </li>
          );
        } else {
          return (
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">
                  {new Date(
                    message.createdOn.seconds * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">You</span>{" "}
                <i className="fa fa-circle me" />
              </div>

              <div className="message other-message float-right">
                <img src={message.image} style={{ width: 70, height: 70 }} />
              </div>
            </li>
          );
        }
      } else {
        if (message.message !== "") {
          return (
            <li>
              <div className="message-data">
                <span className="message-data-name">
                  <i className="fa fa-circle online" />
                  {selected.name}
                </span>
                <span className="message-data-time">
                  {new Date(
                    message.createdOn.seconds * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="message my-message">{message.message}</div>
            </li>
          );
        } else {
          return (
            <li>
              <div className="message-data">
                <span className="message-data-name">
                  <i className="fa fa-circle online" />
                  {selected.name}
                </span>
                <span className="message-data-time">
                  {new Date(
                    message.createdOn.seconds * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="message my-message">
                <img src={message.image} style={{ width: 70, height: 70 }} />
              </div>
            </li>
          );
        }
      }
    });
  }

  async function SendMessage() {
    try {
      const messageRef = collection(
        db,
        "user",
        selected.id,
        "orders",
        oid,
        "messages"
      );
      await addDoc(messageRef, {
        message: text,
        msgBy: 0,
        createdOn: new Date(),
        image: "",
        orderId: oid,
        type: "order",
        userId: selected.id,
      });
      setText("");
      GetMessages(selected.id);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  async function SendImage() {
    try {
      const img = await UploadImage();
      console.log(img);
      const messageRef = collection(
        db,
        "user",
        selected.id,
        "orders",
        oid,
        "messages"
      );
      document.getElementById("exampleModal").style.display = "none";
      await addDoc(messageRef, {
        message: "",
        msgBy: 0,
        createdOn: new Date(),
        image: `${baseurl}${img}`,
        orderId: oid,
        type: "order",
        userId: selected.id,
      });

      setImage("");
      setImg("");
      GetMessages(selected.id);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  return (




















    
    <div className="support-chat">
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <ul className="list">
            {users.map((user) => (
              <li
                className="clearfix"
                style={{
                  backgroundColor: user.id === selected.id ? "red" : "white",
                }}
                onClick={() => {
                  GetMessages(user.id);
                  setSelected(user);
                }}
              >
                {user.image !== "" ? (
                  <img src={`${baseurl}${user.image}`} alt="avatar" />
                ) : (
                  <img src="images/user.png" alt="avatar" />
                )}

                <div className="about">
                  <div
                    className="name"
                    style={{
                      color: user.id === selected.id ? "white" : "black",
                    }}
                  >
                    {user.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat">
          {selected !== "" ? (
            <div>
              <div className="chat-header d-flex align-items-center justify-content-between">
                <div>
                {selected.image !== "" ? (
                  <img
                    src={`${baseurl}${selected.image}`}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                ) : (
                  <img
                    src="images/user.png"
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                )}

                <div className="chat-about ">
                  <div className="chat-with">{selected.name}</div>
                  {/* <div className="chat-num-messages">
                    already 1 902 messages
                  </div> */}
                </div>
                </div>
                <h4>#1234567</h4>
              </div>
              <div className="chat-history">
                <ul>
                  <RenderChat />
                  <div ref={messagesEndRef} />
                  {/* <li>
                    <div className="message-data">
                      <span className="message-data-name">
                        <i className="fa fa-circle online" /> Vincent
                      </span>
                      <span className="message-data-time">10:31 AM, Today</span>
                    </div>
                    <i className="fa fa-circle online" />
                    <i
                      className="fa fa-circle online"
                      style={{ color: "#AED2A6" }}
                    />
                    <i
                      className="fa fa-circle online"
                      style={{ color: "#DAE9DA" }}
                    />
                  </li> */}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <textarea
                  name="message-to-send"
                  id="message-to-send"
                  placeholder="Type your message"
                  rows={2}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  // defaultValue={""}
                />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="file-upload">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  <label className="control-label file_up" htmlFor="attach">
                    <i className="fa fa-paperclip" aria-hidden="true" />
                    <input
                      type="file"
                      id="attach"
                      className="optional inputfile"
                      name="attach"
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                        setImage(URL.createObjectURL(e.target.files[0]));
                        document.getElementById("exampleModal").style.display =
                          "block";
                      }}
                    />
                  </label>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
                <button
                  onClick={() => {
                    if (text !== "") {
                      SendMessage();
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <h3>Welcome Admin</h3>
          )}
        </div>
        {/* end chat */}
      </div>{" "}
      {/* end container */}
      {/***************  Image Modal ************************/}
      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              {/* <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1> */}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  document.getElementById("exampleModal").style.display =
                    "none";
                  setImage("");
                }}
              ></button>
            </div>
            <div class="modal-body">
              <img
                src={image}
                alt="Selected Image"
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  alignSelf: "center",
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  document.getElementById("exampleModal").style.display =
                    "none";
                  setImage("");
                }}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  SendImage();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {/***************  Image Modal ************************/}
      {load && <Loader />}
    </div>
  );
}

export default Chat;
