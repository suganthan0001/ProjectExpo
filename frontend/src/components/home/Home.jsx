import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SimplePieChart from "./SimplePieChart";

function Home() {
  const [readings, setReadings] = useState();
  const [area, setArea] = useState("area1");
  const [data1, setData1] = useState([
    { name: "Group A", value: 3 },
    { name: "Group B", value: 10 },
  ]);

  const [data2, setData2] = useState([
    { name: "Group A", value: 3 },
    { name: "Group B", value: 5 },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/readings");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setReadings(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(readings);
  useEffect(() => {
    const doActions = async () => {
      await fetchData();
      setData1([
        { name: "Group A", value: readings.area1.t3[0].no_of_lights},
        { name: "Group B", value: readings.area1.t3[1].no_of_lights},
      ]);

      setData2([
        { name: "Group A", value: readings.area1.t3[0].no_of_lights},
        { name: "Group B", value: readings.area1.t3[1].no_of_lights},
      ]);
    };
    doActions();
  }, [readings]);

  return (
    <>
      <Navbar />
      <div className="" style={{ height: "86vh" }}>
        <div className="flex justify-evenly mt-10">
          {/* First table */}
          <div className="">
            <h1 className="text-center text-1xl">LIGHTS</h1>
            <table className="table mr-4 text-center border-t-4 border-orange-400">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>Type Of Light</th>
                  <th>Number of Lights</th>
                </tr>
              </thead>
              <tbody>
                {readings ? (
                  readings.area1.t1.map((each) => {
                    return (
                      <tr>
                        <td>{each.no_of_lights}</td>
                        <td>{each.type_of_light}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span className="loading loading-spinner text-warning"></span>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <h1 className="text-center text-1xl">SENSOR READINGS</h1>
            <table className="table mr-4 text-center border-t-4 border-green-400">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>LDR</th>
                  <th>Rain Sensor</th>
                  <th>Fog Sensor</th>
                  <th>Motion Detection</th>
                </tr>
              </thead>
              <tbody>
                {/* Table data */}
                {readings ? (
                  readings.area1.t2.map((each) => {
                    return (
                      <tr>
                        <td>{each.fogSensor}</td>
                        <td>{each.ldr}</td>
                        <td>{each.motion_detection}</td>
                        <td>{each.rain_sensor}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span className="loading loading-spinner text-warning"></span>
                )}
              </tbody>
            </table>
          </div>
          {/* Third table */}
          <div>
            <h1 className="text-center text-1xl">Electricity Readings</h1>
            <table className="table text-center border-t-4 border-orange-400">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>Type Of Light</th>
                  <th>Number of Lights</th>
                  <th>Status of Light</th>
                </tr>
              </thead>
              <tbody>
                {/* Table data */}
                {readings ? (
                  readings.area1.t3.map((each) => {
                    return (
                      <tr>
                        <td>{each.current_consumed}</td>
                        <td>{each.no_of_lights}</td>
                        {each.status_of_lights === 'on' ? <td className="text-green-400">{each.status_of_lights}</td> : <td className="text-orange-400">{each.status_of_lights}</td>}
                        
                      </tr>
                    );
                  })
                ) : (
                  <span className="loading loading-spinner text-warning"></span>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-evenly mt-8" style={{ height: "50%" }}>
          <div className="w-1/2 text-center">
            <SimplePieChart data={data1} />
          </div>
          <div className="w-1/2">
            <SimplePieChart data={data2} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
