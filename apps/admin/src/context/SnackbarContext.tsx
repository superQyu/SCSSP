import React, { createContext, useContext, useState, type SyntheticEvent } from 'react';
import { Snackbar, Box } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Snackbar {
  severity?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
  id?: number | undefined; // 修改类型定义
}

interface SnackbarContextType {
  // eslint-disable-next-line no-unused-vars
  showSnackbar: (snackbar: Snackbar) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([]);

  const showSnackbar = (newSnackbar: Snackbar) => {
    newSnackbar.id = Date.now(); // Generate a unique ID for the new snackbar
    setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
  };

  const handleClose = (event: Event | SyntheticEvent<any, Event>, id: number | undefined) => {
    // 防止级联关闭其他snackbar
    event?.stopPropagation();
    // 修改类型定义
    setSnackbars(snackbars.filter((snackbar) => snackbar.id !== id));
  };

  const handleSnackBarClose = (
    _: Event | SyntheticEvent<any, Event>,
    reason: string,
    id: number | undefined
  ) => {
    if (reason === 'timeout') {
      setSnackbars(snackbars.filter((snackbar) => snackbar.id !== id));
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Box className="flex flex-col-reverse">
        {snackbars.map((snackbar, idx) => (
          <Snackbar
            sx={{ marginBottom: `${4 * idx}rem` }}
            key={snackbar.id}
            open={true}
            autoHideDuration={snackbar.duration}
            anchorOrigin={{
              vertical: snackbar.vertical || 'bottom',
              horizontal: snackbar.horizontal || 'right',
            }}
            message={snackbar.message}
            onClose={(event, reason) => handleSnackBarClose(event, reason, snackbar.id)}
          >
            <Alert
              onClose={(event) => handleClose(event, snackbar.id)}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </SnackbarContext.Provider>
  );
};
