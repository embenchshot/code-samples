import { Resizable, ResizeCallback } from 're-resizable';
import { ReactNode } from 'react';

import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@mui/material/';
import { withStyles } from '@mui/styles';
import { UnfoldLess, UnfoldMore } from '@mui/icons-material';

import { PanelName, PanelStateType } from 'modules/explore';
import colors from 'theme/patterns/colors';

interface CustomAccordionProps {
  panelName: PanelName;
  panelSummary: ReactNode;
  panelDetails: ReactNode;
  onChange?: () => void;
  panelState: PanelStateType;
  setPanelState: React.SetStateAction<
    (
      prev: Record<PanelName, PanelStateType>,
    ) => Record<PanelName, PanelStateType>
  >;
}

const CustomAccordion = ({
  panelName,
  panelSummary,
  panelDetails,
  panelState,
  setPanelState,
  onChange,
  ...rest
}: CustomAccordionProps) => {
  const isPanelExpanded = panelState.expanded;

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    expanded: boolean,
  ) => {
    setPanelState((prev) => {
      const newState = {
        ...prev,
        [panelName]: { ...prev[panelName], expanded },
      };

      const countsPanelsExpanded = Object.keys(newState).reduce(
        (counts: number, panel: PanelName) =>
          newState[panel].expanded ? ++counts : counts,
        0,
      );

      Object.keys(newState).forEach((panel: PanelName) => {
        if (newState[panel].expanded) {
          if (countsPanelsExpanded === 1) {
            newState[panel].size.height = '80vh';
          }
          if (countsPanelsExpanded === 2) {
            newState[panel].size.height = '40vh';
          }
          if (countsPanelsExpanded === 3) {
            if (panel === PanelName.Header) {
              newState[panel].size.height = '16vh';
            } else {
              newState[panel].size.height = '28vh';
            }
          }
        }
      });

      return newState;
    });

    onChange();
  };

  const handleOnResizeStop: ResizeCallback = (_, __, ref) =>
    setPanelState((prev) => {
      const newState = { ...prev };
      newState[panelName].size.height = ref.offsetHeight;
      return newState;
    });

  return (
    <Accordion
      square
      expanded={isPanelExpanded}
      onChange={handleChange}
      style={{
        borderTop:
          panelName === PanelName.Header ? `2px solid ${colors.primary}` : '',
      }}
      {...rest}
    >
      <AccordionSummary
        expandIcon={isPanelExpanded ? <UnfoldLess /> : <UnfoldMore />}
      >
        {panelSummary}
      </AccordionSummary>
      <Resizable
        style={resizeStyles}
        defaultSize={panelState.defaultSize}
        minHeight={panelState.minHeight}
        size={panelState.size}
        enable={{ bottom: true }}
        onResizeStop={handleOnResizeStop}
      >
        <AccordionDetails>{panelDetails}</AccordionDetails>
      </Resizable>
    </Accordion>
  );
};

const resizeStyles = {
  border: 'solid 1px #ddd',
} as const;

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 48,
    height: 48,
    marginBottom: -1,
    borderBottom: '1px solid #e0e0e0',
    '&$expanded': {
      minHeight: 48,
      boxShadow: '0 1px 8px 0 rgba(0,0,0,0.2)',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: 0,
    height: '100%',
    width: '100%',
  },
})(MuiAccordionDetails);

export default CustomAccordion;