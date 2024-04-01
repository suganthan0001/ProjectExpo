import React, { useState } from "react";
import Theme from "../Theme";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function QueryPage() {

  const [loading, setLoading] = useState(false);


  const sendQuery = async (formData,actions) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/submit-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, status:"unsolved"}),
      });
      if (!response.ok) {
        toast.error("Failed to submit query");
        throw new Error("Failed to submit query");
      }
      setTimeout(() => {
        toast.success(
          "Query Submitted Successfully... we will catch you shortly!",
          {
            duration: 5000,
          }
        );
        setLoading(false);
        actions.resetForm();
      }, 2000);
    } catch (error) {
      console.error("Error submitting query:", error);
    }
  };

  const navigate = useNavigate();

  const QueryValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    address: yup
      .string()
      .min(8, "Address should be at least 8 characters")
      .required("Address is required"),
    area: yup.string().required("Area is required"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .test("is-number", "Pincode must be a number", (value) => {
        if (!value) return true; // Allow empty value
        return /^\d+$/.test(value); // Check if value is a number
      })
      .min(4),
    subject: yup
      .string()
      .min(20, "Subject should be at least 20 characters")
      .required("Subject is required"),
    description: yup
      .string()
      .min(50, "Description should be at least 50 characters")
      .required("Description is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      area: "",
      pincode: "",
      subject: "",
      description: "",
    },
    validationSchema: QueryValidationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      sendQuery(values,actions);
    },
  });

  return (
    <div className="grid lg:grid-cols-2 grid-custom-rows px-12 home">
      <button
        className="btn btn-circle btn-outline absolute top-5 left-5 text-3xl"
        onClick={() => {
          navigate("/login");
        }}
      >
        <IoIosArrowRoundBack />
      </button>
      <Theme styles={"absolute top-5 right-5"}/>
      <div className="lg:col-span-2">
        <h1 className="text-1xl md:text-2xl lg:text-5xl text-center font-medium pt-10 whitespace-nowrap">
          <span className="glass">
            "We are waiting to solve your Queries..."
          </span>
        </h1>
      </div>
      <div className="">
        <h2 className="text-center text-lg lg:text-2xl">
          IMPORTANT CONTACT NUMBERS
        </h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5 shadow rounded-lg border-1 border-solid formInputs">
          <h2 className="text-lg text-pretty">
            Submit to Solve your Query....
          </h2>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              id="name"
              type="text"
              className="grow input-ghost"
              placeholder=""
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500">{formik.errors.name}</span>
            )}
          </label>
          {/* Email field */}
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              id="email"
              type="text"
              className="grow"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500">{formik.errors.email}</span>
            )}
          </label>
          <textarea
            id="address"
            className="textarea textarea-bordered h-26"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.address && formik.errors.address && (
            <span className="text-red-500">{formik.errors.address}</span>
          )}
          <label className="input input-bordered flex items-center gap-2">
            Area
            <input
              id="area"
              type="text"
              className="grow"
              placeholder=""
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.area && formik.errors.area && (
              <span className="text-red-500">{formik.errors.area}</span>
            )}
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Pincode
            <input
              id="pincode"
              type="text"
              className=""
              placeholder=""
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <span className="text-red-500">{formik.errors.pincode}</span>
            )}
          </label>
          <textarea
            id="subject"
            className="textarea textarea-bordered h-26"
            placeholder="Subject - Have it Crisp..."
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.subject && formik.errors.subject && (
            <span className="text-red-500">{formik.errors.subject}</span>
          )}
          <textarea
            id="description"
            className="textarea textarea-bordered h-36"
            placeholder="Description of Your Problem"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <span className="text-red-500">{formik.errors.description}</span>
          )}
        </div>
        <button
          className="btn text-2xl glass w-full text-center mt-5"
          type="submit"
        >
          {
            loading ? <span className="loading loading-ring loading-lg"></span> : "Submit"
          }
        </button>
      </form>
    </div>
  );
}

export default QueryPage;
