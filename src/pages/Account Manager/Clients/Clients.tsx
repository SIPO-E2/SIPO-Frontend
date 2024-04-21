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

import Pagination from "../../../components/Pagination";
import { getClients } from "../../../api/clientAPI";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients(currentPage, itemsPerPage);
        setClients(data.data);
        setTotalItems(data.total);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };
    fetchClients();
  }, [currentPage]);

  return (
    <div className="main-content">
      <ClientCards clients={clients} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Clients;
