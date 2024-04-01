import React from "react";
import Theme from "../Theme";
import { RiCustomerServiceLine } from "react-icons/ri";

function QueryPage() {
  return (
    <div className="grid grid-cols-2 grid-custom-rows px-12">
      <Theme />
      <div className="col-span-2">
        <h1 className="text-5xl text-center font-medium pt-10 whitespace-nowrap">
          <span className="glass">"We are waiting to solve your Queries..."</span>
        </h1> 
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-center text-2xl">IMPORTANT CONTACT NUMBERS</h2>
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form>
        <div className="flex flex-col gap-5 shadow rounded-lg border-1 border-solid formInputs">
          <h2 className="text-lg text-pretty">
            Submit to Solve your Query....
          </h2>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" placeholder="" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="text" className="grow" placeholder="" />
          </label>
          <textarea
            className="textarea textarea-bordered h-26"
            placeholder="Address"
          ></textarea>
          <label className="input input-bordered flex items-center gap-2">
            Area
            <input type="text" className="grow" placeholder="" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Pincode
            <input type="number" className="" placeholder="" />
          </label>
          <textarea
            className="textarea textarea-bordered h-26"
            placeholder="Subject - Have it Crisp..."
          ></textarea>
          <textarea
            className="textarea textarea-bordered h-36"
            placeholder="Description of Your Problem"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default QueryPage;
