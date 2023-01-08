import React from "react";

import { LinearProgress as MuiLinearProgress } from "@mui/material";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

export const LinearProgress = () => {
  return <LinearProgressElement />;
};

const LinearProgressElement = styled(MuiLinearProgress)`
  &&& {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 4px;
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.5)}`};

    & > span {
      background-color: ${({ theme }) => theme.primary05};
    }
  }
`;
