"use client";
import { useState, ChangeEvent } from "react";
import { uploadApi } from "@/lib/api";

export default function CSVUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setSuccess(false);
    if (!file || file.type !== "text/csv") {
      setError("Please upload a valid CSV file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await uploadApi("/product/upload-csv", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) setError("Upload failed");

      const data = await response.json();
      console.log("Upload success:", data);
      setSuccess(true);
    } catch (error) {
      setError("Something went wrong during upload. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bulk Upload Products (CSV)</h2>

      {loading && (
        <div className="loading-screen" style={{ margin: 20, color: "blue" }}>
          Uploading file, please wait...
        </div>
      )}

      {!loading && !success && (
        <>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </>
      )}

      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: 20, textAlign: "center" }}
        >
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}

      {success && (
        <div
          className="success-message"
          style={{ color: "green", marginTop: 20, textAlign: "center" }}
        >
          File uploaded successfully!
        </div>
      )}
    </div>
  );
}
