import { useEffect, useState } from "react";
import { NavLink, Link, useParams, Outlet } from "react-router-dom";
// import Van from "../../server";
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

export default function HostVanDetail() {
  const { id } = useParams<{ id: string }>();
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  // Having a Link to ".." will take you back to the parent route which is the HostVans page.
  // The relative prop is set to "path" so we can go back to Host Vans inlsstead of the parent route.
  return (
    <section>
      <Link to="../clients" className="back-button">
        &larr; <span>Back </span>
      </Link>

      <div className="client-detail-layout-container">
        <nav className="client-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Client Content
          </NavLink>

          <NavLink
            to="projects"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Projects
          </NavLink>
        </nav>
        <Outlet context={[currentClient]} />
      </div>
    </section>
  );
}
