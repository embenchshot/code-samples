import { useState } from 'react';

import { Wifi } from '@mui/icons-material';
import { Chip as MuiChip } from '@mui/material/';
import { withStyles } from '@mui/styles';
import colors from 'theme/patterns/colors';

interface RadioSignalChipProps {
  handleDelete: () => void;
}

const RadioSignalChip = ({ handleDelete, ...rest }: RadioSignalChipProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      {hover ? (
        <Chip
          icon={<IconChip />}
          color="primary"
          onDelete={handleDelete}
          {...rest}
        />
      ) : (
        <IconChip style={{ color: colors.primary, margin: '3px 0 0 4px' }} />
      )}
    </div>
  );
};

const Chip = withStyles({
  root: {
    cursor: 'pointer',
    borderRadius: '4px 16px 16px 4px',
  },
  label: {
    display: 'none',
  },
  icon: {
    margin: '0 12px 3px 4px !important',
  },
})(MuiChip);

const IconChip = withStyles({
  root: {
    transform: 'rotate(135deg)',
    fontSize: '24px',
  },
})(Wifi);

export default RadioSignalChip;