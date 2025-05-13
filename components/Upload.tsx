import { uploadApi } from "@/lib/api";
import { useState } from "react";

type FileWithPreview = File & { preview: string }; // Extend File to include preview URL

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("files: ", e.target.files);
      // if you want to show preview of images

      // const selectedFiles: FileWithPreview[] = Array.from(e.target.files).map(
      //   (file) => ({
      //     ...file,
      //     preview: URL.createObjectURL(file),
      //   })
      // );
      // setFiles(selectedFiles);

      setFiles(Array.from(e.target.files));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!category || files.length === 0) {
      setStatus("Please select a category and upload images.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("upload", file));
    formData.append("category", category);

    setStatus("Uploading...");
    try {
      const response = await uploadApi(
        `/category/products/upload-product-images?category=${category}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setStatus(result.message || "Images uploaded successfully!");
      } else {
        setStatus(result.error || "Error uploading images.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="ml-64 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Upload Product Images
      </h1>

      {/* Category Selection */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg">
          Select Category
        </label>
        <select
          id="category"
          className="w-full p-2 border rounded-md"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="personalized-gifts">Personalized Gifts</option>
          <option value="home-decor">Home Decor</option>
          <option value="chocolates-sweets">Chocolates & Sweets</option>
          <option value="greeting-cards">Greeting Cards</option>
          <option value="jewelry-accessories">Jewelry & Accessories</option>
          <option value="books-stationery">Books & Stationery</option>
          <option value="gift-hampers">Gift Hampers</option>
          <option value="handmade-diy">Handmade & DIY Gifts</option>
          <option value="toys-games">Toys & Games</option>
        </select>
      </div>

      {/* Drag-and-Drop Area */}
      <div
        className="mb-4 p-4 border-2 border-dashed border-gray-400 rounded-md text-center"
        style={{ height: "200px" }}
      >
        <input
          type="file"
          id="images"
          name="upload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="images"
          className="cursor-pointer text-lg font-semibold text-blue-500"
        >
          Drag and drop your images here or click to select.
        </label>
      </div>

      {/* Image Preview */}
      {/* <div className="mb-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="mt-2 text-sm text-center">{file.name}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Upload Button */}
      <div className="text-center">
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Upload Images
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p
            className={
              status.includes("Error") ? "text-red-500" : "text-green-500"
            }
          >
            {status}
          </p>
        </div>
      )}
    </div>
  );
}
