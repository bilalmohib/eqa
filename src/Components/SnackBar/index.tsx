import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarProps {
  setIsOpen: any,
  isOpen: boolean,
  message: string,
}

const SnackBar: React.FC<SnackBarProps> = ({
  setIsOpen,
  isOpen,
  message
}) => {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          // Lift it up a bit
          transform: "translateY(-30px)",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: '100%',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default SnackBar;