import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ mt: 3 }}>
        <Typography
          sx={{ fontSize: 20, letterSpacing: 0.1, fontWeight: 'bold' }}
        >
          Confirm Deletion
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 18 }}>
          Are you sure you want to delete this review?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 4 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            flexGrow: 1,
            py: 1.2,
            mr: 1,
            borderRadius: 3,
            bgcolor: '#F5F5F5',
            color: '#A0A0A0',
            border: 'none', // 테두리 제거
            boxShadow: 'none', // 그림자 제거
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#E0E0E0', // hover 시 약간 어두운 회색
              border: 'none', // 테두리 제거
              boxShadow: 'none', // 그림자 제거
              textTransform: 'none',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            flexGrow: 1,
            ml: 1,
            py: 1.2,
            borderRadius: 3,
            bgcolor: '#E8EAF6',
            color: '#1E88E5',
            border: 'none', // 테두리 제거
            boxShadow: 'none', // 그림자 제거
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#C5CAE9', // hover 시 약간 더 진한 파란색
              border: 'none', // 테두리 제거
              boxShadow: 'none', // 그림자 제거
              textTransform: 'none',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
