import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import QueriesTable from "./QueriesTable";

function SolveQuery() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/queries");
      const data = await response.json();
      console.log(data.queries);
      setQueries(data.queries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const solved = async () => {
    try {
      console.log("Solved")
      setLoading(true);
      const response = await fetch("http://localhost:3000/solvedQueries");
      const data = await response.json();
      console.log(data.queries);
      setQueries(data.queries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const unsolved = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/unsolvedQueries");
      const data = await response.json();
      console.log(data.queries);
      setQueries(data.queries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <QueriesTable
        queries={queries}
        fetchData={fetchData}
        solved={solved}
        loading={loading}
        unsolved={unsolved}
      />
    </div>
  );
}

export default SolveQuery;
