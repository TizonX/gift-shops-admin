"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddProductForm from "../../../components/Product/AddProductForm";
import CSVUpload from "@/components/Product/CSVUpload";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string; // optional
};
export default function AddProdut() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();
  const [mode, setMode] = useState("form");
  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product added successfully!");
        reset(); // Clear the form
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 border rounded ${
            mode === "form" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setMode("form")}
        >
          Add Single Product
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            mode === "csv" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setMode("csv")}
        >
          Bulk Upload (CSV)
        </button>
      </div>
      {mode === "form" ? (
        <AddProductForm {...{ register, handleSubmit, onSubmit, errors }} />
      ) : (
        <CSVUpload />
      )}
    </div>
  );
}
