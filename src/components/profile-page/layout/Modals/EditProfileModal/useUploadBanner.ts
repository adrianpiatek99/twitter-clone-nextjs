import { useEffect, useState } from "react";

import { useUploadImageFile } from "hooks/useUploadImageFile";

export const useUploadBanner = (profileBannerUrl: string) => {
  const {
    files,
    onFileChange: onBannerFileChange,
    uploadImageFile: uploadBannerImageFile,
    resetFileStates
  } = useUploadImageFile({ sizeLimit: 1.5 });
  const bannerFile = files[0];
  const [bannerUrl, setBannerUrl] = useState(
    bannerFile ? URL.createObjectURL(bannerFile) : profileBannerUrl
  );

  const handleRemoveBanner = () => {
    if (bannerFile) {
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
    if (bannerFile) {
      setBannerUrl(URL.createObjectURL(bannerFile));

      return;
    }

    setBannerUrl(profileBannerUrl);
  }, [bannerFile, profileBannerUrl]);

  return {
    bannerUrl,
    bannerFile,
    onBannerFileChange,
    uploadBannerImageFile,
    resetBannerFileStates,
    handleRemoveBanner
  };
};
