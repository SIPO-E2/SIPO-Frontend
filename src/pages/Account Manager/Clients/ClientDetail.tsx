// ClientDetail.tsx
import { useEffect, useState } from "react";
import { NavLink, Link, useParams, Outlet } from "react-router-dom";
import ClientData from "./Data/data";

interface Client {
  id: number;
  imageURL: string;
  name: string;
  joiningDate: string;
  numberOfProjects: number;
  experience: string;
  money: string;
  division: string[];
  contractFile?: File | null;
  additionalDetails?: string;
  highGrowthClient: boolean;
}

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = ClientData.find((client) => client.id === parseInt(id, 10));
    setCurrentClient(client);
  }, [id]);

  return (
    <section>
      <Link to="../clients" className="back-button">
        &larr; <span>Back</span>
      </Link>

      <div className="client-detail-layout-container">
        <nav className="client-detail-nav">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive ? "font-bold underline text-black" : ""
            }
          >
            Client Content
          </NavLink>

          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive ? "font-bold underline text-black" : ""
            }
          >
            Projects
          </NavLink>
        </nav>
        <Outlet context={[currentClient]} />
      </div>
    </section>
  );
}
