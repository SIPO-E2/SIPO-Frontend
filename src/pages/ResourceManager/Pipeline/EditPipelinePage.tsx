import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Props } from "./EditPipelinePage";

interface EditPipelineProps extends Props {}

export const EditPipeline: React.FC<Props> = () => {
  return (
    <div className="flex h-screen bg-gray-100" style={{ display: "flex", marginTop: "-40px", }}>
      {/* Main Content */}
      <div className="flex-grow">
        <div className="px-5 pt-4 d-flex mb-3">
          <div className="p-2 me-auto">
            <h1> Edit Pipeline </h1>
          </div>
        </div>

        {/* Main Content and Sections */}
        <div className="ml-10 mr-10 p-4 d-flex justify-content-between border-top border-dark">
          {/* First Part */}
          <div className="flex-1 p-4 ">
            <div
              className="foto"
              style={{
                width: "50%",
                height: "30%",
                marginLeft: "50px",
                marginTop: "-30px",
              }}
            >
              <div className="flex items-center justify-center h-full bg-white p-6 shadow-lg rounded">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* Contenedor para los elementos de carga de archivo, utilizando flex para alinear elementos */}
                  <div className="mt-3 flex flex-col items-center text-sm leading-6 text-gray-600">
                    <div className="flex">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-2">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 mt-1">
                      PNG, JPG, GIF
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Pipeline">
              <div
                id="icon-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "0%",
                  marginTop: "5%",
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                <h2
                  className="ml-4 text-2xl font-semibold"
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                  Mariana García Gómez
                </h2>
              </div>
            </div>
            <div
              className="barras"
              style={{ width: "60%", transform: "translateY(45px)" }}
            >
              <div className="flex flex-row mb-3">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Gender</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>Female</p>
                </div>
              </div>

              <div className="flex flex-row mb-3">
                <div className="container bg-blue-300 rounded text-left">
                  <p>ID</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>CL01923456</p>
                </div>
              </div>
              <div className="flex flex-row mb-3">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Joining Date</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>12/12/2023</p>
                </div>
              </div>

              <div className="flex flex-row mb-3">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Employee Status</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>Billing</p>
                </div>
              </div>

              <div className="flex flex-row mb-4">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Employee email</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>Email</p>
                </div>
              </div>

              <div className="flex flex-row mb-5">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Employee Phone</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>Phone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Part */}
          <div
            className="flex-1 p-4 border-left border-dark"
            style={{
              width: "10%",
              height: "35%",
              marginLeft: "10px",
              display: "flex",
              marginTop: "-30px",
            }}
          >
            <div
              className="Datos"
              style={{
                width: "110%",
                marginLeft: "-120px",
                marginTop: "-15px",
              }}
            >
              <div
                className="grid grid-cols-3 gap-4"
                style={{ display: "flex", width: "110%", marginLeft: "-100px" }}
              >
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Name</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Email</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Phone</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Phone"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-4"
                style={{ display: "flex", width: "110%", marginLeft: "-100px" }}
              >
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Division</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Division"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Job Grade</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Job Grade"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">Job title</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Job title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-4"
                style={{ display: "flex", width: "110%", marginLeft: "-100px" }}
              >
                <div className="mb-1">
                  <label className="font-bold sm:text-l pb-3">Tech Stack</label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Tech Stack"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-1">
                  <label
                    className="font-bold sm:text-1 pb-3"
                    style={{
                      width: "150%",
                      height: "40%",
                      marginLeft: "-5px",
                      display: "flex",
                    }}
                  >
                    Propose Action
                  </label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Propose Action"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="font-bold sm:text-l pb-3"
                    style={{
                      width: "100%",
                      height: "40%",
                      marginLeft: "-10px",
                      display: "flex",
                    }}
                  ></label>
                  <input
                    type="text"
                    id="Name"
                    placeholder="Work Force's Reason current state"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-4"
                style={{ display: "flex", width: "110%", marginLeft: "-100px" }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3 col-span-3">
                    <label className="font-bold sm:text-l pb-3">Skills</label>
                    <div
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      style={{
                        width: "250%",
                        height: "70%",
                        marginLeft: "10px",
                        overflow: "auto",
                      }}
                    >
                      <div
                        className="grid grid-cols-3 gap-1"
                        style={{ marginLeft: "10px" }}
                      >
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>Python</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>C++</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>SQL</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>CSS</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>C#</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>HTML</p>
                        </div>
                        <div className="bg-gray-200 rounded-md p-2 text-center">
                          <p>JavaScript</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-span-1 flex flex-col"
                  style={{
                    width: "100%",
                    height: "150%",
                    marginLeft: "237px",
                    display: "flex",
                  }}
                >
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">Salary</label>
                    <input
                      type="text"
                      id="Name"
                      placeholder="Work Force's Email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">Move to</label>
                    <div className="bg-blue-300 rounded-md p-2 text-center" >
                    <p>Bench</p>
                  </div>
                  </div>
                </div>
              </div>
              <div
                className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                style={{
                  width: "109%",
                  marginLeft: "-89px",
                  height: "20%",
                  display: "flex",
                  marginTop: "-45px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <label className="font-bold sm:text-l pb-3">
                    On Pipeline since
                  </label>
                  <div className="bg-gray-200 rounded-md p-2 text-center">
                    <input
                      type="date"
                      id="date2"
                      className="w-full rounded-md border border-gray-300 bg-white p-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold sm:text-l pb-3">
                    Days on pipeline
                  </label>
                  <div className="bg-gray-200 rounded-md p-2 text-center">
                    <p>2</p>
                  </div>
                </div>
                <div>
                  <label className="font-bold sm:text-l pb-3">
                    On Pipeline since
                  </label>
                  <div className="bg-gray-200 rounded-md p-2 text-center">
                    <input
                      type="date"
                      id="date2"
                      className="w-full rounded-md border border-gray-300 bg-white p-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2" >
              <button className="bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-3">
                Cancel
              </button>
              <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPipeline;
