import { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

import { Button } from '@mui/material/';

import colors from 'theme/patterns/colors';

interface HoverIconButtonProps {
  text: string;
  customColors?: Record<string, string>;
  hoverIcon: ReactNode;
}

const HoverIconButton = forwardRef(
  ({ text, customColors, hoverIcon, ...props }: HoverIconButtonProps, ref) => (
    <ButtonStyled
      buttonRef={ref}
      variant="outlined"
      customColors={customColors}
      {...props}
    >
      {text}
      <IconHover className="icon-hover">{hoverIcon}</IconHover>
    </ButtonStyled>
  ),
);

const ButtonStyled = styled(({ customColors, buttonRef, ...rest }) => (
  <Button ref={buttonRef} {...rest} />
))`
  color: ${({ customColors }) =>
    `${customColors ? customColors.text : colors.black} !important`};
  overflow-wrap: anywhere;
  text-align: left;
  :hover {
    .icon-hover {
      color: ${({ customColors }) =>
        customColors ? '#fff' : 'rgba(0,0,0,0.54)'};
      background-color: ${({ customColors }) =>
        customColors ? customColors.color : '#e0e0e0'};
      visibility: visible;
      opacity: 1;
    }
  }

  &.MuiButton-outlined {
    border: ${({ customColors }) =>
      `1px solid ${customColors ? customColors.color : '#e0e0e0'}`};
    :hover {
      background-color: ${({ customColors }) =>
        customColors ? customColors.bgc : 'rgba(0,0,0,0.04)'};
    }
  }

  .MuiButton-label {
    font-weight: 600;
    text-transform: none;
  }
`;

const IconHover = styled.div`
  position: absolute;
  right: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 31px;
  visibility: hidden;
  opacity: 0;
  border-radius: 0 5px 5px 0;
  background-color: #e0e0e0;
  transition: opacity 0.3s;
  color: rgba(0, 0, 0, 0.54);
`;

export default HoverIconButton;