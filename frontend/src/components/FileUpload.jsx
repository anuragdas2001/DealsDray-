import { useState, useEffect } from "react";
import axios from "axios"; // You can use fetch if preferred, but axios simplifies file uploads

export const FileUpload = ({ value, onChange }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // If an existing avatar is provided, set it as the initial preview
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Call the parent's onChange to pass the file
    onChange(selectedFile);

    // Preview the new file if it's an image
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file); // 'avatar' must match the backend's expected field name

    try {
      const response = await axios.post(
        "http://localhost:5000/upload", // Your backend API endpoint for handling uploads
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      
      alert("File uploaded successfully");
      console.log("Uploaded File:", response.data); // Response from Cloudinary or backend
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="file-uploader p-4 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <input
          type="file"
          className="w-32 mt-4 text-white p-2 rounded-md"
          onChange={handleFileChange}
        />
        {preview && (
          <div>
            <label className="font-normal">Preview</label>
            <img
              src={preview} // Display the avatar or uploaded file
              alt="Preview"
              className="mt-2 rounded-md w-32 h-32 object-cover"
            />
          </div>
        )}
        <button
          onClick={handleUpload}
          className="bg-black h-10 w-32 me-2 mt-4 text-white rounded-md"
          disabled={!file}
        >
          Upload File
        </button>
      </div>
    </div>
  );
};
