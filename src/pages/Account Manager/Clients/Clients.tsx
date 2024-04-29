import { useState, useEffect } from "react";
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
import Pagination from "../../../components/Pagination";
import { useApisStore } from "../../../store/apiStore";

interface SelectedClient {
  id: number | null;
  name: string;
}

const Clients = () => {
  const { clients, fetchClients, setClients } = useApisStore((state) => ({
    clients: state.clients,
    fetchClients: state.fetchClients,
    setClients: state.setClients,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [isHighGrowth, setIsHighGrowth] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchClients(
      currentPage,
      itemsPerPage,
      searchQuery,
      selectedDivision,
      isHighGrowth,
      true
    );
  }, [currentPage, searchQuery, selectedDivision, isHighGrowth, fetchClients]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Ensuresss a fresh search from page 1
  };

  const handleDivisionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDivision(event.target.value);
    setCurrentPage(1); // Ensures a fresh search from page 1
  };

  const toggleHighGrowth = () => {
    setIsHighGrowth((prev) => !prev);
    setCurrentPage(1); // Ensures a fresh search from page 1
  };

  // Add console.log to track state changes
  console.log("Clients:", clients);

  /* --------------------- Settings pop up --------------------- */

  const [openSettingsIds, setOpenSettingsIds] = useState(new Set<number>());

  const toggleSettings = (id: number) => {
    setOpenSettingsIds(
      (prev) =>
        new Set(
          prev.has(id) ? [...prev].filter((item) => item !== id) : [...prev, id]
        )
    );
  };

  /* --------------------- Delete pop up ---------------------*/

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
    setSelectedClient({ id: null, name: "" });
  };

  /* --------------------- Dropdown --------------------- */

  const [dropdown, setDropdown] = useState(false);

  /* --------------------- Render Deleting --------------------- */

  // Function to handle the deletion of a client
  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter((client) => client.id !== clientId));
    setDeletePopupOpen(false); // Close the popup after deletion
  };

  useEffect(() => {
    fetchClients(
      currentPage,
      itemsPerPage,
      searchQuery,
      selectedDivision,
      isHighGrowth,
      true
    );
  }, [currentPage, searchQuery, selectedDivision, isHighGrowth, fetchClients]);

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
              value={searchQuery}
              onChange={handleSearchChange}
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
                    <li className="dropdown-item ">
                      <select
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                        className="select-dropdown-division-clients"
                      >
                        <option value="">All Divisions</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Central & South America">CSA</option>
                        <option value="United States">US</option>
                      </select>
                    </li>
                    <li className="dropdown-item">
                      <label className="label-high-growth-client">
                        <input
                          type="checkbox"
                          checked={isHighGrowth}
                          onChange={toggleHighGrowth}
                          className="checkbox-high-growth-clients"
                        />
                        <p className="high-growth-text-clients">High-Growth</p>
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      {error && <p>Error loading clients: {error}</p>}
      <div className="container-fluid" style={{ marginTop: "80px" }}>
        <div className="row">
          <ClientCards
            clients={clients}
            toggleSettings={toggleSettings}
            openSettingsIds={openSettingsIds}
            onOpenDeletePopup={handleOpenDeletePopup}
          />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={setCurrentPage}
      />
      {isDeletePopupOpen && (
        <DeleteClient
          key={selectedClient.id}
          clientId={selectedClient.id as number}
          clientName={selectedClient.name}
          onClose={handleCloseDeletePopup}
          onDelete={handleDeleteClient}
        />
      )}
    </div>
  );
};

export default Clients;
