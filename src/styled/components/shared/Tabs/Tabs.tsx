import React, { ComponentProps, ComponentPropsWithoutRef, ReactElement, useRef } from "react";
import { HiChevronLeft } from "react-icons/hi";

import { IconButton } from "components/core";
import styled, { css } from "styled-components";

import { Tab, TabRestProps } from "./Tab";
import { useTabsObserver } from "./useTabsObserver";

type TabComponent = ReactElement<ComponentProps<typeof Tab> & TabRestProps>;

interface TabsProps<T> extends Omit<ComponentPropsWithoutRef<"nav">, "onChange"> {
  children: TabComponent | TabComponent[];
  value: T & string;
  onChange?: (tab: T & string) => void;
}

export const Tabs = <T,>({ children, value, onChange, ...props }: TabsProps<T>) => {
  const tabGroupRef = useRef<HTMLDivElement>(null);
  const { forwardArrow, backwardArrow, scrollTo } = useTabsObserver(tabGroupRef);

  const handleForward = () => scrollTo("forward");

  const handleBackward = () => scrollTo("backward");

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const childValue = child.props.value;
      const selected = childValue === value ?? false;

      return React.cloneElement(child, {
        selected,
        onClick: () => onChange?.(childValue as T & string)
      });
    }

    return null;
  });

  return (
    <TabsWrapper {...props}>
      <BackwardArrow isActive={backwardArrow}>
        <ScrollToButton title="Go backward" onClick={handleBackward} color="white" disableFocus>
          <HiChevronLeft />
        </ScrollToButton>
      </BackwardArrow>
      <TabGroupInner ref={tabGroupRef}>{childrenWithProps}</TabGroupInner>
      <ForwardArrow isActive={forwardArrow}>
        <ScrollToButton title="Go forward" onClick={handleForward} color="white" disableFocus>
          <HiChevronLeft />
        </ScrollToButton>
      </ForwardArrow>
    </TabsWrapper>
  );
};

type SharedProps = {
  isActive: boolean;
};

const TabsWrapper = styled.nav`
  position: relative;
  display: flex;
  width: 100%;
  user-select: none;
  height: 53px;
`;

const TabGroupInner = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  width: 100%;
  overflow-x: auto;
  scroll-padding: 0px 36px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const sharedArrowStyles = css<SharedProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 3;
  transition: opacity 0.2s;

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;

const BackwardArrow = styled.div`
  left: 5px;
  ${sharedArrowStyles}
`;

const ForwardArrow = styled.div`
  right: 5px;
  ${sharedArrowStyles}

  & > button > svg {
    transform: rotate(180deg);
  }
`;

const ScrollToButton = styled(IconButton)`
  padding: 4px;
  width: 30px;
  height: 30px;
`;
