import type { ChangeEvent } from "react";
import { useState } from "react";

import type { AxiosError } from "axios";
import axios from "axios";
import { imageFileTypes } from "constants/fileTypes";
import { API_CLOUDINARY_KEY, API_CLOUDINARY_URL } from "constants/links";

import { useToasts } from "./useToasts";

interface UseUploadImageFileProps {
  sizeLimit?: number;
  limit?: number;
}

export const useUploadImageFile = ({ sizeLimit = 2, limit = 1 }: UseUploadImageFileProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { handleAddToast } = useToasts();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files);
      const filesAfterSelection: File[] = [];

      if (filesArray.length > limit) {
        handleAddToast(
          "error",
          limit > 1 ? `Please choose up to ${limit} photos.` : "Please choose only one photo."
        );

        return;
      }

      filesArray.map(file => {
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

          filesAfterSelection.push(file);
        }
      });

      setFiles(filesAfterSelection);
    }

    e.target.value = "";
  };

  const uploadImageFile = async (
    file: File
  ): Promise<{ url: string; width: number; height: number }> => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", API_CLOUDINARY_KEY);

    try {
      const {
        data: { secure_url, height, width }
      } = await axios.post(API_CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "text/plain",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      return {
        url: secure_url,
        width,
        height
      };
    } catch (error) {
      throw error as AxiosError;
    }
  };

  const resetFileStates = () => {
    setFiles([]);
  };

  return {
    files,
    onFileChange,
    uploadImageFile,
    resetFileStates
  };
};
