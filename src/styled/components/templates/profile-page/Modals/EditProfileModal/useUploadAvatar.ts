import { useUploadImageFile } from "hooks/useUploadImageFile";

export const useUploadAvatar = (profileImageUrl: string) => {
  const {
    file: avatarFile,
    fileBase64: avatarFileBase64,
    isLoading: isAvatarLoading,
    onFileChange: onAvatarFileChange,
    uploadImageFile: uploadAvatarImageFile,
    resetFileStates: resetAvatarFileStates
  } = useUploadImageFile(0.5);
  const avatarUrl = avatarFileBase64 || profileImageUrl;

  return {
    avatarUrl,
    avatarFile,
    avatarFileBase64,
    isAvatarLoading,
    onAvatarFileChange,
    uploadAvatarImageFile,
    resetAvatarFileStates
  };
};
