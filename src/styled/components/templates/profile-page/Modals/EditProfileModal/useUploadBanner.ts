import { useEffect, useState } from "react";

import { useUploadImageFile } from "hooks/useUploadImageFile";

export const useUploadBanner = (profileBannerUrl: string) => {
  const {
    file: bannerFile,
    fileBase64: bannerFileBase64,
    isLoading: isBannerLoading,
    onFileChange: onBannerFileChange,
    uploadImageFile: uploadBannerImageFile,
    resetFileStates
  } = useUploadImageFile(1.5);
  const [bannerUrl, setBannerUrl] = useState(profileBannerUrl);

  const handleRemoveBanner = () => {
    if (bannerFileBase64) {
      resetBannerFileStates();
      setBannerUrl(profileBannerUrl);

      return;
    }

    setBannerUrl("");
  };

  const resetBannerFileStates = () => {
    setBannerUrl(profileBannerUrl);
    resetFileStates();
  };

  useEffect(() => {
    if (bannerFileBase64) {
      setBannerUrl(bannerFileBase64);

      return;
    }

    setBannerUrl(profileBannerUrl);
  }, [bannerFileBase64, profileBannerUrl]);

  return {
    bannerUrl,
    bannerFile,
    bannerFileBase64,
    isBannerLoading,
    onBannerFileChange,
    uploadBannerImageFile,
    resetBannerFileStates,
    handleRemoveBanner
  };
};
