import React, { useState } from "react";

function QueriesTable({ queries, fetchData, solved, unsolved, loading }) {
  const updateQueryStatus = async (queryId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/queries/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ queryId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update query status");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating query status:", error);
    }
  };
  const [filter, setFilter] = useState("queries");

  const fetchDataByFilter = () => {
    if (filter === "queries") {
      fetchData();
    } else if (filter === "solved") {
      solved();
    } else if (filter === "unsolved") {
      unsolved();
    }
  };

  const handleCheckbox = async (queryId) => {
    await updateQueryStatus(queryId);
    fetchDataByFilter();
  };
  return (
    <>
      <div className="overflow-x-auto px-15">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Area</th>
              <th>Pincode</th>
              <th>PROBLEM</th>
              <th>
                <div className="join">
                  <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="Solved"
                    onClick={() => {
                      setFilter("solved");
                    //   fetchDataByFilter();

                    solved();
                    }}
                  />

                  <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="All"
                    onClick={() => {
                        setFilter("queries");
                      fetchData();
                    }}
                  />

                  <input
                    className="join-item btn"
                    type="radio"
                    name="options"
                    aria-label="Unsolved"
                    onClick={() => {
                      setFilter("unsolved");
                    //   fetchDataByFilter

                    unsolved();
                    }}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
                queries.length != 0 ?
              queries.map((query, index) => {
                return (
                  <>
                    <tr key={query.id} className="text-center">
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked={query.status === "solved"}
                            onClick={() => {
                              handleCheckbox(query.queryId, fetchData);
                            }}
                            className="checkbox"
                          />
                        </label>
                      </th>
                      <td>{query.name}</td>
                      <td>{query.email}</td>
                      <td>{query.address}</td>
                      <td>{query.area}</td>
                      <td>{query.pincode}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById(index).showModal()
                          }
                        >
                          SHOW QUERY
                        </button>
                      </td>
                      <td>
                        {query.status === "solved" ? (
                          <p className="text-green-500 text-lg">Solved</p>
                        ) : (
                          <p className="text-red-500 text-lg">Unsolved</p>
                        )}
                      </td>
                    </tr>
                    <dialog id={`${index}`} className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Subject</h3>
                        <p className="py-4">{query.subject}</p>
                        <h3 className="font-bold text-lg">Description</h3>
                        <p className="py-4">{query.description}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </>
                );
              }) : <tr>No Queries Found</tr>
            )}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
}

export default QueriesTable;
