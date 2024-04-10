"use client"; 

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

const BugReportEditor = () => {
  const [reportNumber, setReportNumber] = useState('');
  const [bugType, setBugType] = useState('');
  const [summary, setSummary] = useState('');
  const [formError, setFormError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "saveButton") {
      if (!reportNumber || !bugType || !summary) {
        setFormError('Please fill in all the fields correctly');
        return;
      }
    }  

    if (e.nativeEvent.submitter.name === "saveButton") {
      const { data, error } = await db
        .from('reports')
        .insert([{ reportNumber, bugType, summary }]);
    
      if (error) {
        console.log(error);
        setFormError('Error occurred while saving the report');
      } else {
        console.log(data);
        setFormError(null);
      }
    }
  };

  const handleEdit = () => {
    setFormError(null); // Clear form error state
    router.push("/edit"); // Redirect to /edit upon clicking the edit button
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="w-full md:w-96">
        <h1 className="text-2xl font-bold mb-4">Edit Bug Report</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reportNumber" className="block font-medium">Report #:</label>
            <input
              type="number"
              id="reportNumber"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bugType" className="block font-medium">Type of Bug:</label>
            <input
              type="text"
              id="bugType"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={bugType}
              onChange={(e) => setBugType(e.target.value)}
            />
            <label htmlFor="summary" className="block font-medium mt-4">Summary of Bug:</label>
            <textarea
              type="text"
              id="summary"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="flex justify-start"> {/* Use justify-end for right-aligning buttons */}
            <button
              name="saveButton" // Add name attribute here
              className="mr-4 border border-black rounded bg-gray-300 px-4 py-2"
            >
              Save
            </button>
            <button
              className="border border-black rounded bg-gray-300 px-4 py-2"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default BugReportEditor;
