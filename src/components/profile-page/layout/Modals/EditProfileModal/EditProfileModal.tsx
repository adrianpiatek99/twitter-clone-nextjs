import React, { useMemo, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Modal } from "components/core";
import { useToasts } from "hooks/useToasts";
import { PROFILE_NAME_MAX_LENGTH } from "schema/authSchema";
import {
  type ProfileValues,
  PROFILE_DESCRIPTION_MAX_LENGTH,
  PROFILE_URL_MAX_LENGTH,
  profileSchema
} from "schema/profileSchema";
import styled, { css } from "styled-components";
import type { UserData } from "types/user";
import { api } from "utils/api";
import { reloadSession } from "utils/session";

import { EditProfileModalAvatar } from "./EditProfileModalAvatar";
import { EditProfileModalBanner } from "./EditProfileModalBanner";
import { useUploadAvatar } from "./useUploadAvatar";
import { useUploadBanner } from "./useUploadBanner";

const FORM_ID = "edit-profile-modal-form";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

export const EditProfileModal = ({ isOpen, onClose, userData }: EditProfileModalProps) => {
  const { name, description, url, profileImageUrl, profileBannerUrl } = userData;
  const { handleAddToast } = useToasts();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name,
      description,
      url
    }
  });
  const editProfileMutation = api.user.editProfile.useMutation({
    onSuccess: () => {
      onClose();
      reloadSession();
      resetAvatarFileStates();
      resetBannerFileStates();
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });
  const {
    avatarUrl,
    avatarFile,
    uploadAvatarImageFile,
    onAvatarFileChange,
    resetAvatarFileStates
  } = useUploadAvatar(profileImageUrl);
  const {
    bannerUrl,
    bannerFile,
    onBannerFileChange,
    handleRemoveBanner,
    uploadBannerImageFile,
    resetBannerFileStates
  } = useUploadBanner(profileBannerUrl);
  const [uploadingImages, setUploadingImages] = useState(false);
  const isLoading = editProfileMutation.isLoading || uploadingImages;

  const onSubmit: SubmitHandler<ProfileValues> = async data => {
    if (isLoading || !isDataChanged) return;

    try {
      setUploadingImages(true);

      const avatar =
        (avatarFile && (await uploadAvatarImageFile(avatarFile)).url) ?? profileImageUrl;
      const banner = (bannerFile && (await uploadBannerImageFile(bannerFile)).url) ?? bannerUrl;

      editProfileMutation.mutate({
        ...data,
        profileImageUrl: avatar,
        profileBannerUrl: banner
      });

      return;
    } catch (error) {
      const err = error as any;

      handleAddToast("error", err?.message);

      return;
    } finally {
      setUploadingImages(false);
    }
  };

  const isDataChanged = useMemo(() => {
    const isEntriesChanged = !Object.entries(watch()).every(
      ([key, value]) => value === userData[key]
    );
    const isAvatarChanged = profileImageUrl !== avatarUrl;
    const isBannerChanged = profileBannerUrl !== bannerUrl;

    return isEntriesChanged || isAvatarChanged || isBannerChanged;
  }, [userData, watch(), avatarUrl, bannerUrl]);

  const handleOnClose = () => {
    onClose();
    resetAvatarFileStates();
    resetBannerFileStates();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      headerTitle="Edit profile"
      onAccept={handleSubmit(onSubmit)}
      formId={FORM_ID}
      loading={isLoading}
      acceptButtonDisabled={!isDataChanged}
    >
      <Inner $loading={isLoading}>
        <EditProfileModalBanner
          src={bannerUrl}
          onFileChange={onBannerFileChange}
          removeBannerPhoto={handleRemoveBanner}
        />
        <Content>
          <EditProfileModalAvatar src={avatarUrl} onFileChange={onAvatarFileChange} />
          <Form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name")}
              value={watch("name")}
              label="Name"
              error={errors.name?.message}
              maxLength={PROFILE_NAME_MAX_LENGTH}
            />
            <Input
              {...register("description")}
              value={watch("description")}
              label="Bio"
              error={errors.description?.message}
              maxLength={PROFILE_DESCRIPTION_MAX_LENGTH}
            />
            <Input
              {...register("url")}
              value={watch("url") ?? ""}
              label="Website"
              error={errors.url?.message}
              maxLength={PROFILE_URL_MAX_LENGTH}
            />
          </Form>
        </Content>
      </Inner>
    </Modal>
  );
};

const Inner = styled.div<{ $loading: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: opacity 0.2s;

  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 16px 32px 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
