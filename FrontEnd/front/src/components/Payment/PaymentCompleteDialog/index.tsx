// PaymentCompleteDialog.tsx
import React from 'react';
import { Box, Button, Dialog, DialogTitle } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatAmount } from '@/utiles/paymentList';

interface PaymentCompleteDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  amount: number;
}

const PaymentCompleteDialog = ({
  dialogOpen,
  setDialogOpen,
  amount,
}: PaymentCompleteDialogProps) => {
  const router = useRouter();

  const handleClose = () => {
    setDialogOpen(false);
    router.push('/my-page/payments');
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
        <Image
          src="/svgs/success-icon.svg"
          alt="success icon"
          width={48}
          height={48}
        />
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18 }}>
          Thank you for purchasing{' '}
          {amount > 1000
            ? `${formatAmount(amount)}`
            : `${formatAmount(amount)}`}
        </DialogTitle>
        <Button
          onClick={handleClose}
          fullWidth
          sx={{
            mt: 1,
            borderRadius: '12px',
            fontWeight: 'bold',
            color: 'var(--color-blue-7)',
            backgroundColor: 'var(--color-blue-3)',
            textTransform: 'none',
            fontSize: 16,
            '&:hover': {
              backgroundColor: 'var(--color-blue-main)',
              color: 'var(--color-white)',
            },
          }}
        >
          OK
        </Button>
      </Box>
    </Dialog>
  );
};

export default PaymentCompleteDialog;
