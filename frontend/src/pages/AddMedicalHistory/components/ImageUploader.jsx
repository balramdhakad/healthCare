import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({
  imageFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  existingImageUrl,
}) => {
  const isEditMode = !!existingImageUrl;

  return (
    <div className="mb-8">
      <label className="text-sm font-medium text-gray-700 block mb-3">
        Upload Image (Optional)
      </label>

      {isEditMode && !imageFile && (
        <div className="mb-3 p-3 border border-yellow-300 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            Existing Image is saved. Upload a new file to replace it.
          </p>
          <img
            src={existingImageUrl}
            alt="Existing Record"
            className="mt-2 h-20 w-auto rounded-md object-cover"
          />
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => document.getElementById("imageUpload").click()}
      >
        <FaCloudUploadAlt className="w-10 h-10 text-blue-500 mx-auto mb-2" />
        {imageFile ? (
          <p className="text-sm font-medium text-blue-700">
            File selected: {imageFile.name}
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-blue-700">
              {isEditMode
                ? "Click or Drag to Upload New Image"
                : "Upload a file or drag and drop"}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </>
        )}
        <input
          type="file"
          id="imageUpload"
          name="image"
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
