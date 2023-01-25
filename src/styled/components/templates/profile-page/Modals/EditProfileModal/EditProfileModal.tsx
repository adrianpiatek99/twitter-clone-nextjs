import React, { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { UserData } from "api/user/userByScreenName";
import type { AxiosError } from "axios";
import { Input, Modal } from "components/core";
import { useToasts } from "hooks/useToasts";
import { editProfile } from "network/user/editProfile";
import { type ProfileValues, profileSchema } from "schema/profileSchema";
import styled, { css } from "styled-components";
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
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name,
      description,
      url
    }
  });
  const editProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      onClose();
      reloadSession();
      resetAvatarFileStates();
      resetBannerFileStates();
    },
    onError: (error: AxiosError) => {
      handleAddToast("error", error.message);
    }
  });
  const {
    avatarUrl,
    avatarFile,
    isAvatarLoading,
    uploadAvatarImageFile,
    onAvatarFileChange,
    resetAvatarFileStates
  } = useUploadAvatar(profileImageUrl);
  const {
    bannerUrl,
    bannerFile,
    onBannerFileChange,
    isBannerLoading,
    handleRemoveBanner,
    uploadBannerImageFile,
    resetBannerFileStates
  } = useUploadBanner(profileBannerUrl);
  const isLoading = editProfileMutation.isLoading || isAvatarLoading || isBannerLoading;

  const onSubmit: SubmitHandler<ProfileValues> = async data => {
    if (isLoading || !isDataChanged) return;

    try {
      const avatar = (avatarFile && (await uploadAvatarImageFile(avatarFile))) ?? profileImageUrl;
      const banner = (bannerFile && (await uploadBannerImageFile(bannerFile))) ?? bannerUrl;

      editProfileMutation.mutate({
        ...data,
        profileImageUrl: avatar,
        profileBannerUrl: banner
      });

      return;
    } catch (error) {
      const err = error as AxiosError;

      handleAddToast("error", err?.message);

      return;
    }
  };

  const isDataChanged = useMemo(() => {
    const isEntriesChanged = !Object.entries(watch()).every(
      ([key, value]) => value === userData[key]
    );
    const isAvatarChanged = profileImageUrl !== avatarUrl;
    const isBannerChanged = profileBannerUrl !== bannerUrl;

    return isEntriesChanged || isAvatarChanged || isBannerChanged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            />
            <Input
              {...register("description")}
              value={watch("description")}
              label="Bio"
              error={errors.description?.message}
            />
            <Input
              {...register("url")}
              value={watch("url") ?? ""}
              label="Website"
              error={errors.url?.message}
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
  padding: 0 16px 48px 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
