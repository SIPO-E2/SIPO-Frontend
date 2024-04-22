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
import { getClients } from "../../../api/clientAPI";

interface SelectedClient {
  id: number | null;
  name: string;
}

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [isHighGrowth, setIsHighGrowth] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;

  const fetchFilteredClients = async () => {
    try {
      const data = await getClients(
        currentPage,
        itemsPerPage,
        searchQuery,
        selectedDivision,
        isHighGrowth
      );
      setClients(data.data);
      setTotalItems(data.total);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      setError(null);
    }
  };

  useEffect(() => {
    fetchFilteredClients();
  }, [currentPage, searchQuery, selectedDivision, isHighGrowth]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Ensures a fresh search from page 1
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

  return (
    <div className="main-content">
      <div className="search-section">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search for clients..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedDivision} onChange={handleDivisionChange}>
          <option value="">All Divisions</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
        </select>
        <label>
          High Growth
          <input
            type="checkbox"
            checked={isHighGrowth}
            onChange={toggleHighGrowth}
          />
        </label>
      </div>
      {error && <p>Error loading clients: {error}</p>}
      <ClientCards
        clients={clients}
        toggleSettings={toggleSettings}
        openSettingsIds={openSettingsIds}
        onOpenDeletePopup={handleOpenDeletePopup}
      />
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
        />
      )}
    </div>
  );
};

export default Clients;
