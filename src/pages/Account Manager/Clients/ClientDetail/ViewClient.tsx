// ViewClient.tsx
import "./ViewClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faBriefcase,
  faChartSimple,
  faEarthAmericas,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Client } from "../../../../types";

const ViewClient = () => {
  // We obtain the client from the Outlet so we dont have to fetch it again
  const [client] = useOutletContext<[Client]>();

  // print the divisions of the client
  const divisions = client.divisions.map((division) => division).join(", ");

  return (
    <div className="main-content-view-client">
      <div className="body-content-view-client">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="md:col-span-8 p-6 bg-white rounded-lg shadow-md">
            <div className="details-section-view-client">
              <h1 className="client-name-view-client">{client.name}</h1>
              <h2 className="client-description-title">Client Description</h2>
              <p className="client-description-text">
                {client.additionalDetails ? client.additionalDetails : ""}
              </p>
              <h2 className="client-key-title">Key Responsibilities</h2>
              <ul className="custom-bullet">
                <li className="list-item">
                  Working with agency for design drawing detail, quotation and
                  local production.
                </li>
                <li className="list-item">
                  Produce window displays, signs, interior displays, floor plans
                  and special promotions displays
                </li>
                <li className="list-item">
                  Change displays to promote new product launches and reflect
                  festive or seasonal themes.
                </li>
                <li className="list-item">
                  Planning and executing the open/renovation/ closing store
                  procedure
                </li>
                <li className="list-item">
                  Follow‐up store maintenance procedure and keep updating SKU In
                  & Out.
                </li>
                <li className="list-item">
                  Monitor costs and work within budget.
                </li>
                <li className="list-item">
                  Liaise with suppliers and source elements.
                </li>
              </ul>

              <h2 className="client-why-title">Why You'll Love Working Here</h2>
              <ul className="custom-bullet">
                <li className="list-item">
                  Working with agency for design drawing detail, quotation and
                  local production.
                </li>
                <li className="list-item">
                  Produce window displays, signs, interior displays, floor plans
                  and special promotions displays
                </li>
                <li className="list-item">
                  Change displays to promote new product launches and reflect
                  festive or seasonal themes.
                </li>
                <li className="list-item">
                  Planning and executing the open/renovation/ closing store
                  procedure
                </li>
                <li className="list-item">
                  Follow‐up store maintenance procedure and keep updating SKU In
                  & Out.
                </li>
                <li className="list-item">
                  Monitor costs and work within budget.
                </li>
                <li className="list-item">
                  Liaise with suppliers and source elements.
                </li>
              </ul>
              <h2 className="client-benefits-title">Contract File</h2>
            </div>
            <div style={{ marginTop: "-30px" }}>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                    style={{ paddingLeft: "1.3rem" }}
                  >
                    <li className="flex items-center justify-between py-4 pr-5 text-lg leading-6 ">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {client.contractFile
                              ? client.contractFile.toString()
                              : ""}
                          </span>
                          <span className="flex-shrink-0 text-gray-400">
                            {client.contractFile ? "4.5mb" : ""}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:col-span-4 space-y-6">
            {/* Details Box */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="date-posted">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="icon-calendar"
                />
                <div className="date-info">
                  <span className="date-title">Joining Date</span>
                  <span className="date-value">
                    {client.joiningDate
                      ? new Date(client.joiningDate).toISOString().slice(0, 10)
                      : ""}
                  </span>
                </div>
              </div>

              <div className="date-posted">
                <FontAwesomeIcon icon={faBriefcase} className="icon-calendar" />
                <div className="date-info">
                  <span className="date-title">Num. Projects</span>
                  <span className="date-value">{client.projects.length}</span>
                </div>
              </div>

              <div className="date-posted">
                <FontAwesomeIcon icon={faUser} className="icon-calendar" />
                <div className="date-info">
                  <span className="date-title">Client</span>
                  <span className="date-value">
                    {client.high_growth ? "High Growth" : "Regular"}
                  </span>
                </div>
              </div>

              <div className="date-posted">
                <FontAwesomeIcon icon={faMoneyBill} className="icon-calendar" />
                <div className="date-info">
                  <span className="date-title">Offered Salary</span>
                  <span className="date-value">
                    {client.salary ? client.salary : 0}
                  </span>
                </div>
              </div>

              <div className="date-posted">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="icon-calendar"
                />
                <div className="date-info">
                  <span className="date-title">Experience</span>
                  <span className="date-value">{client.experience}</span>
                </div>
              </div>

              <div className="date-posted">
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  className="icon-calendar"
                />
                <div className="date-info">
                  <span className="date-title">Division</span>
                  <span className="date-value">{divisions}</span>
                </div>
              </div>
            </div>

            {/* Company Box */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="owner-user-card">
                <div>
                  <img
                    src={client.owner_user.profileImage}
                    className="card-image"
                    alt="Company Logo"
                  />
                </div>
                <div className="right-card-section">
                  <h4 className="owners-user-client">
                    {client.owner_user.name}
                  </h4>
                  <p className="client-email-view-client">
                    {client.owner_user.email}
                  </p>
                  <p className="client-id-view-client">
                    ID: {client.owner_user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
