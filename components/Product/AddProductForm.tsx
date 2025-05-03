import React from "react";

export default function AddProductForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
}: any) {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              Product name is required
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.category && (
            <span className="text-red-500 text-sm">Category is required</span>
          )}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            {...register("image")}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
