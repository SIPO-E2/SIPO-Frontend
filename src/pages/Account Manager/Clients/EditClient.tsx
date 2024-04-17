import { useParams } from "react-router-dom";
import "./Styles/EditClient.css";

const EditClient = () => {
  const { id } = useParams();

  return (
    <div className="main-content">
      <div className="header-section">
        <h1 className="title-section">Edit Client</h1>
      </div>
      <hr className="custom-hr" />
      <div className="contain">
        <div className="wrapper">
          <div className="contacts">
            <h3>Our contacts</h3>
            <ul>
              <li>San Joe St.</li>
              <li>00-1212121-11</li>
              <li>mail@mail.com</li>
            </ul>
          </div>

          <div className="form">
            <h3>Send us a message</h3>
            <form action="#">
              <p>
                <label htmlFor="yourName">Your name</label>
                <input type="text" id="yourName" />
              </p>
              <p>
                <label htmlFor="skype">Skype</label>
                <input type="text" id="skype" />
              </p>
              <p>
                <label htmlFor="email">Email Address</label>
                <input type="text" id="email" />
              </p>
              <p>
                <label htmlFor="topic">Topic</label>
                <input type="text" id="topic" />
              </p>
              <p className="full-width">
                <label htmlFor="message">Write your message</label>
                <textarea id="message" cols={30} rows={7}></textarea>
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
