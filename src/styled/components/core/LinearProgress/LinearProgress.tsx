import React from "react";

import { LinearProgress as MuiLinearProgress } from "@mui/material";
import styled, { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

type Position = "top" | "bottom";
interface LinearProgressProps {
  position?: Position;
}

export const LinearProgress = ({ position = "top" }: LinearProgressProps) => {
  return <LinearProgressElement position={position} />;
};

const LinearProgressElement = styled(MuiLinearProgress)<LinearProgressProps>`
  &&& {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 3px;
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.5)}`};

    & > span {
      background-color: ${({ theme }) => theme.primary05};
    }

    ${({ position }) =>
      position === "bottom" &&
      css`
        top: auto;
        bottom: 0px;
      `}
  }
`;
