import type { ChangeEvent } from "react";
import { useState } from "react";

import type { AxiosError } from "axios";
import axios from "axios";
import { imageFileTypes } from "constants/fileTypes";

import { useToasts } from "./useToasts";

const API_URL = "https://api.cloudinary.com/v1_1/demo/image/upload";
const API_KEY = "docs_upload_example_us_preset";

export const useUploadImageFile = (sizeLimit = 2) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { handleAddToast } = useToasts();

  const getBase64 = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {
        if (typeof reader.result === "string") {
          setFileBase64(reader.result);
        }
      };
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];

      e.target.value = "";

      if (file) {
        const { type, size } = file;
        const sizeInMB = Number((size / (1024 * 1024)).toFixed(2));

        if (!imageFileTypes.some(fileType => fileType === type)) {
          handleAddToast("error", "Invalid file type.");

          return;
        }

        if (sizeInMB >= sizeLimit) {
          handleAddToast(
            "error",
            `Maximum image size exceeded. Please choose an image under ${sizeLimit} MB.`
          );

          return;
        }

        getBase64(file);
        setFile(file);
      }
    }
  };

  const uploadImageFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", API_KEY);

    try {
      setIsLoading(true);

      const {
        data: { secure_url }
      } = await axios.post(API_URL, formData, {
        onUploadProgress: progressEvent => {
          if (progressEvent.total) {
            setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        },
        headers: {
          "Content-Type": "text/plain",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      return secure_url as string;
    } catch (error) {
      throw error as AxiosError;
    } finally {
      setIsLoading(false);
    }
  };

  const resetFileStates = () => {
    setFile(null);
    setFileBase64("");
    setUploadProgress(0);
  };

  return {
    file,
    fileBase64,
    isLoading,
    uploadProgress,
    onFileChange,
    uploadImageFile,
    resetFileStates
  };
};
