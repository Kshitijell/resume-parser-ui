import { Chip, styled } from '@mui/material';

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '21px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.grey[0],
  '.MuiChip-deleteIcon': {
    display: 'none',
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '.MuiChip-label': {
    padding: '0 6px',
  },
}));
export const renderTags = (value, getTagProps) => {
  const numSelected = value.length - 1;
  return (
    <>
      {value.slice(0, 1).map((option, index) => (
        <StyledChip
          key={option.value}
          label={option.label}
          onDelete={() => {}}
          sx={{ width: '100px' }}
          {...getTagProps({ index })}
        />
      ))}
      {numSelected > 0 && <StyledChip key='OnlyOneKeyData' onDelete={null} label={`+${numSelected}`} />}
    </>
  );
};
