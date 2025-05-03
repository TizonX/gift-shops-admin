"use client";
import { useState, ChangeEvent } from "react";
import Papa from "papaparse";

type Product = {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  [key: string]: string; // allow flexibility for more fields
};

export default function CSVUpload() {
  const [csvData, setCsvData] = useState<Product[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "text/csv") {
      alert("Please upload a valid CSV file");
      return;
    }

    setFileName(file.name);

    Papa.parse<Product>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        setCsvData(results.data);
      },
      error: (error) => {
        console.error("Parsing error:", error);
      },
    });
  };

  const handleUploadToBackend = () => {
    // Replace this with your real API call (fetch/axios)
    alert("Send parsed data to backend:\n" + JSON.stringify(csvData, null, 2));
  };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bulk Upload Products (CSV)</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="w-full border p-2 rounded mb-4"
      />

      {csvData.length > 0 && (
        <>
          <p className="text-sm text-gray-600 mb-2">File: {fileName}</p>

          <div className="max-h-64 overflow-y-auto border rounded p-2 bg-gray-50 text-sm mb-4">
            <pre>{JSON.stringify(csvData.slice(0, 5), null, 2)}</pre>
            {csvData.length > 5 && (
              <p className="text-xs text-gray-400 mt-2">
                ...and {csvData.length - 5} more rows
              </p>
            )}
          </div>

          <button
            onClick={handleUploadToBackend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload to Backend
          </button>
        </>
      )}
    </div>
  );
}
