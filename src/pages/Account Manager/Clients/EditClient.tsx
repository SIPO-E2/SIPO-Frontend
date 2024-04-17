import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Styles/EditClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const EditClient = () => {
  const { id } = useParams();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="main-content">
      <div className="header-section-edit-client">
        <h1 className="title-section">Edit Client</h1>
      </div>
      <hr className="custom-hr-edit-client" />
      <div className="contain">
        <div className="wrapper">
          <div className="contacts">
            <h3 className="h3-edit-client">Details</h3>
            <p className="p-edit-client">Title, short description, image... </p>
          </div>

          <div className="form">
            <form className="form-edit-client" action="#">
              <p>
                <label className="label-edit-client" htmlFor="yourName">
                  Name
                </label>
                <input
                  type="text"
                  id="yourName"
                  className="input-edit-client"
                  placeholder="Ex: Microsft"
                />
              </p>
              <p>
                <label className="label-edit-client" htmlFor="division">
                  Division
                </label>
                <div className="input-edit-client-wrapper">
                  <select id="division" className="select-edit-client">
                    <option
                      value=""
                      disabled
                      selected
                      style={{ display: "none" }}
                    >
                      Selecciona una división
                    </option>
                    <option value="division1">Brazil</option>
                    <option value="division2">Mexico</option>
                    <option value="division3">División 3</option>
                  </select>
                  <FontAwesomeIcon
                    icon={isFocused ? faChevronDown : faChevronUp}
                    className="fas"
                  />
                </div>
              </p>
              <p>
                <label className="label-edit-client" htmlFor="email">
                  Image URL
                </label>
                <input type="text" id="email" className="input-edit-client" />
              </p>
              <p>
                <label className="label-edit-client" htmlFor="topic">
                  Contract
                </label>
                <input type="text" id="topic" className="input-edit-client" />
              </p>
              <p className="full-width">
                <label className="label-edit-client" htmlFor="message">
                  Client Details
                </label>
                <textarea
                  id="message"
                  cols={30}
                  rows={7}
                  className="textarea-edit-client"
                  placeholder="Write your message here..."
                ></textarea>
              </p>
              <p className="full-width">
                <button className="send-button" type="submit">
                  Send
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
