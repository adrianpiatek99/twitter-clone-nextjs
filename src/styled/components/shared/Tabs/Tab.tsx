import React, { ComponentPropsWithoutRef } from "react";

import { Tab as MuiTab } from "@mui/material";
import styled from "styled-components";

type TabProps = ComponentPropsWithoutRef<typeof MuiTab>;

export const Tab = ({ ...props }: TabProps) => {
  return <TabElement {...props} />;
};

const TabElement = styled(MuiTab)`
  &&& {
    color: ${({ theme }) => theme.neutral300};
    text-transform: capitalize;
    ${({ theme }) => theme.text.m}

    &.Mui-selected {
      color: ${({ theme }) => theme.neutral100};
    }
  }
`;
