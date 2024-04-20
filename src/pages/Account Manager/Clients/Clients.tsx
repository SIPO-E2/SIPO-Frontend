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
import clientes from "./Data/data";
import Pagination from "../../../components/Pagination";

interface CheckboxStates {
  highGrowth: boolean;
}

interface SelectedClient {
  id: number | null;
  name: string;
}

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Clients: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [openSettingsIds, setOpenSettingsIds] = useState<Set<number>>(
    new Set()
  );
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    highGrowth: false,
  });

  // Unique list of divisions for the dropdown
  const divisions = Array.from(
    new Set(clientes.flatMap((client) => client.division))
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleDivisionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDivision(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter clients based on search query, selected division, and high-growth checkbox state
  const filteredClients = clientes.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedDivision ? client.division.includes(selectedDivision) : true) &&
      (!checkboxStates.highGrowth || client.highGrowthClient)
  );

  // Function to toggle the checkbox state

  const toggleCheckbox = (key: keyof CheckboxStates) => {
    setCheckboxStates((prev) => ({ ...prev, [key]: !prev[key] }));
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

  // Add state for the delete popup

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<SelectedClient>({
    id: null,
    name: "",
  });

  const handleOpenDeletePopup = (clientId: number, clientName: string) => {
    console.log("Opening delete popup for client:", clientId);
    setSelectedClient({ id: clientId, name: clientName });
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    console.log("Closing delete popup");
    setDeletePopupOpen(false);
    setSelectedClient({ id: null, name: "" });
  };

  /* Pagination logic */

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fist we filter the clients, then we paginate them
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  // Change the pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                        className="division-selector-clients"
                      >
                        <option value="">All Divisions</option>
                        {divisions.map((division) => (
                          <option key={division} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li className="dropdown-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={checkboxStates.highGrowth}
                          onChange={() => toggleCheckbox("highGrowth")}
                        />
                        High-Growth
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
            clients={currentItems}
            toggleSettings={toggleSettings}
            openSettingsIds={openSettingsIds}
            onOpenDeletePopup={handleOpenDeletePopup}
          />
        </div>
      </div>
      {/* Conditionally render the DeleteClient component */}
      {isDeletePopupOpen && (
        <DeleteClient
          key={selectedClient.id}
          clientId={selectedClient.id as number}
          clientName={selectedClient.name}
          onClose={handleCloseDeletePopup}
        />
      )}

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredClients.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Clients;
