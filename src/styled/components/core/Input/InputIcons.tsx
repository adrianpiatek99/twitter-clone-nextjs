import React, { Dispatch, SetStateAction } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import styled from "styled-components";

import { IconButton } from "../IconButton";

interface InputIconsProps {
  isPasswordIcon: boolean;
  isPasswordVisible: boolean;
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>;
  error?: string;
}

export const InputIcons = ({
  isPasswordIcon,
  isPasswordVisible,
  setIsPasswordVisible,
  error
}: InputIconsProps) => {
  return (
    <IconsWrapper>
      {isPasswordIcon && (
        <IconButton
          title={isPasswordVisible ? "Hide password" : "Show password"}
          onClick={() => setIsPasswordVisible(prev => !prev)}
          disableFocus
        >
          {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      )}
      {error && (
        <IconButton color="error" title={error} disableFocus>
          <WarningRoundedIcon />
        </IconButton>
      )}
    </IconsWrapper>
  );
};

const IconsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 4px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;
