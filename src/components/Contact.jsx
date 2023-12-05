import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setContactData } from "../store/contactSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
// import ContactService from "../appwrite/contact"; // Import your authentication service
import { useForm } from "react-hook-form";

const Contact = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    // Define the setContactData action
    const setContactData = (data) => {
      dispatch({ type: "SET_CONTACT_DATA", payload: data });
    };
  
    // Define the clearContactData action
    const clearContactData = () => {
      dispatch({ type: "CLEAR_CONTACT_DATA" });
    };
  
    const onSubmit = async (data) => {
      setError("");
      setSuccess("");
  
      try {
        setContactData(data);
  
        // Handle the contact form submission logic here
        // ...
  
        // After successful submission, clear the form data
        clearContactData();
  
        setSuccess("Form submitted successfully!");
  
        // Clear the form fields
        setValue("name", "");
        setValue("email", "");
        setValue("message", "");
  
        navigate("/confirmation");
      } catch (error) {
        setError(error.message);
      }
    };
  
    // Your JSX code for the Contact form
  
    return (
      <div className="flex items-center justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name:"
              placeholder="Enter your name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Message:"
              type="text"
              placeholder="Enter your message"
              {...register("message", {
                required: true,
              })}
            />
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {success && <p className="text-green-600 mt-4">{success}</p>}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Contact;
