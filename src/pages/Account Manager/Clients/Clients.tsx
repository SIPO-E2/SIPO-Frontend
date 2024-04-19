import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Styles/Cards.css";
import "./Styles/Clients.css";
import ClientCards from "./ClientCards";
import DeleteClient from "./DeleteClient";

interface CheckboxStates {
  division: boolean;
  highGrowth: boolean;
}

// Adjust the selectedClient state to allow id to be number or null
interface SelectedClient {
  id: number | null;
  name: string;
}

const Clients = () => {
  const [dropdown, setDropdown] = useState(false);
  const [openSettingsIds, setOpenSettingsIds] = useState<Set<number>>(
    new Set()
  );

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

  const toggleSettings = (id: number) => {
    setOpenSettingsIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<SelectedClient>({
    id: null,
    name: "",
  });

  const handleOpenDeletePopup = (clientId: number, clientName: string) => {
    setSelectedClient({ id: clientId, name: clientName });
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupOpen(false);
    setSelectedClient({ id: null, name: "" }); // Reset selected client
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
      <div className="container-fluid" style={{ marginTop: "80px" }}>
        <div className="row">
          <ClientCards
            toggleSettings={toggleSettings}
            openSettingsIds={openSettingsIds}
            onOpenDeletePopup={handleOpenDeletePopup} // Pass this function to ClientCards
          />
        </div>
      </div>
      {/* Conditionally render the DeleteClient component */}
      {isDeletePopupOpen && selectedClient.id && (
        <DeleteClient
          clientId={selectedClient.id}
          clientName={selectedClient.name}
          onClose={handleCloseDeletePopup}
        />
      )}
    </div>
  );
};

export default Clients;