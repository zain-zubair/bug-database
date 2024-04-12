"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EditBugReport = () => {
  const [reportNumber, setReportNumber] = useState("");
  const [bugType, setBugType] = useState("");
  const [summary, setSummary] = useState("");
  const [existingReport, setExistingReport] = useState(null);
  const [enabled, setEnable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect runs whenever existingReport changes
    if (existingReport === null) {
      // Clear form fields when existingReport becomes null
      setReportNumber("");
      setBugType("");
      setSummary("");
    }
  }, [existingReport]);

  const handleSearchReport = async () => {
    try {
      console.log("Searching report...");
      const { data, error } = await db
        .from("reports")
        .select("*")
        .eq("reportNumber", reportNumber)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setExistingReport(data);
        setBugType(data.bugType);
        setSummary(data.summary);
        setEnable(false);
      } else {
        setExistingReport(null); // Setting existingReport to null when report is not found
        console.log("Report not found.");
        setEnable(true);
      }
    } catch (error) {
      console.error("Error fetching report:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await db
        .from("reports")
        .update({ bugType: bugType, summary: summary })
        .eq("reportNumber", reportNumber);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Report updated successfully:", data);
        setExistingReport(null); // Clearing existingReport after successful update
      }
    } catch (error) {
      console.error("Error updating report:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="w-full md:w-96">
        <h1 className="text-2xl font-bold mb-4">Edit Bug Report</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reportNumber" className="block font-medium">
              Report #:
            </label>
            <input
              type="text"
              id="reportNumber"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
            />
            <button
              type="button"
              className="mt-2 bg-gray-300 px-3 py-1 rounded"
              onClick={handleSearchReport}
            >
              Search
            </button>
          </div>
          {existingReport && (
            <div>
              <label htmlFor="bugType" className="block font-medium">
                Type of Bug:
              </label>
              <input
                type="text"
                id="bugType"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={bugType}
                onChange={(e) => setBugType(e.target.value)}
              />
              <label htmlFor="summary" className="block font-medium mt-4">
                Summary of Bug:
              </label>
              <textarea
                id="summary"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          )}

          {/* 
          Update report button:
            Disabled until a valid report number is entered 
            Alerts the user that the update has been successfull.  
          */}

          <button
            disabled={enabled}
            onClick={() => {
              alert("Update Sucessful");
              router.push("/report");
            }}
            type="submit"
            className="mr-4 border border-black rounded bg-gray-300 px-4 py-2"
          >
            Update Report
          </button>

          <Link href="/">
            <button className="border border-black rounded bg-gray-300 px-4 py-2">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditBugReport;
