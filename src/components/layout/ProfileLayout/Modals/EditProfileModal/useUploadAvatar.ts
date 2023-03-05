import { useUploadImageFile } from "hooks/useUploadImageFile";

export const useUploadAvatar = (profileImageUrl: string) => {
  const {
    files,
    onFileChange: onAvatarFileChange,
    uploadImageFile: uploadAvatarImageFile,
    resetFileStates: resetAvatarFileStates
  } = useUploadImageFile({ sizeLimit: 0.5 });
  const avatarFile = files[0];
  const avatarUrl = avatarFile ? URL.createObjectURL(avatarFile) : profileImageUrl;

  return {
    avatarUrl,
    avatarFile,
    onAvatarFileChange,
    uploadAvatarImageFile,
    resetAvatarFileStates
  };
};
