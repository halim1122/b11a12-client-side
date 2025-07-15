import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxios from "../../Hook/useAxios";

const AddPackages = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const axiosInstance = useAxios();

  const uploadImages = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageAPI_key}`,
        formData
      );
      urls.push(res?.data?.data?.url);
    }
    return urls;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (newPackage) => {
      const res = await axiosInstance.post("/packages", newPackage);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      Swal.fire("Success!", "Package Added Successfully!", "success");
      reset();
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const imageFiles = fileInputRef.current.files;
      const imageUrls = await uploadImages(imageFiles);

      const packageData = {
        name: data.name,
        description: data.description,
        images: imageUrls,
        rating: parseFloat(data.rating),
        price: parseFloat(data.price),
        tourTime: data.tourTime,
        created_at: new Date().toISOString(),
      };

      await mutateAsync(packageData);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add package", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tour Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter tour name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tour Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Tour description"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Tour Images (Multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Rating (out of 5)</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              {...register("rating", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Tour Time</label>
          <input
            {...register("tourTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., 5 Days / 4 Nights"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackages;
