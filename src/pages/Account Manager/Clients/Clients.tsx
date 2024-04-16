import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../../Clients.css";
import { Link } from "react-router-dom";

// Defining an interface for the checkbox states
interface CheckboxStates {
  division: boolean;
  highGrowth: boolean;
}

const Clients = () => {
  const [dropdown, setDropdown] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    division: false,
    highGrowth: false,
  });

  // Function to toggle the checkbox state
  const toggleCheckbox = (key: keyof CheckboxStates) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="main-content">
      <div className="header-section">
        <h1 className="title-section">Clients</h1>
        <div className="right-section">
          <Link to="/accountManager/clients/new">
            <button className="create-button">Add Client</button>
          </Link>

          <div className="search-section">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search for clients..."
            />
            <button className="sort-button">
              <FontAwesomeIcon icon={faSort} className="sort-icon" />
              <span>Sort</span>
              <div onClick={() => setDropdown((state) => !state)}>
                <FontAwesomeIcon
                  icon={dropdown ? faChevronUp : faChevronDown}
                  className="display-icon"
                />
              </div>
              {dropdown && (
                <div className="floating-dropdown4 show cursor-pointer">
                  <ul>
                    <li className="dropdown-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={checkboxStates.division}
                          onChange={() => toggleCheckbox("division")}
                        />
                        <span className="sort-text">Division</span>
                      </label>
                    </li>
                    <li className="dropdown-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={checkboxStates.highGrowth}
                          onChange={() => toggleCheckbox("highGrowth")}
                        />
                        <span className="sort-text">High-Growth</span>
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <hr className="custom-hr" />
    </div>
  );
};

export default Clients;
