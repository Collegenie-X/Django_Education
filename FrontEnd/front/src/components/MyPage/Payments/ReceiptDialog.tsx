import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { formatAmount } from '@/utiles/paymentList';
import { cookieUtils } from '@/utiles/cookieUtils';
import { formatDate } from '@/utiles/formatDate';

interface ReceiptDialogProps {
  open: boolean;
  onClose: () => void;
  data: any;
  userName: string;
}

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(1),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  width: 100,
  padding: theme.spacing(1),
  color: '#3c3c3c',
}));

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  data,
  userName,
}) => {
  const unitPrice = parseFloat(((data.totalAmount / 11) * 10).toFixed(2));
  const tax = parseFloat((data.totalAmount / 11).toFixed(2));

  const renderTableCell = (
    label: string,
    value: string | number,
    align: 'left' | 'center' = 'center',
  ) => (
    <StyledTableCell align={align}>
      {label === 'Price' ||
      label === 'Tax' ||
      label === 'Total Amount' ||
      label === 'Unit Price'
        ? formatAmount(value as number)
        : value}
    </StyledTableCell>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{ borderRadius: 2 }}
    >
      <DialogTitle
        sx={{
          color: '#7c7c7c',
          fontSize: 20,
          ml: { sm: 2, md: 5 },
          mt: { sm: 1, md: 2 },
        }}
      >
        Receipt
      </DialogTitle>
      <DialogContent sx={{ mb: 3 }}>
        <InfoBox>
          <Typography
            variant="subtitle2"
            sx={{ ml: { sm: 2, md: 7 }, color: '#5d5d5d' }}
          >
            Customer Name:
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            {cookieUtils.getCookie('username') || ''}
          </Typography>
        </InfoBox>
        <Divider
          sx={{
            mt: { sm: 2, md: 3 },
            mb: { sm: 1, md: 2 },
            borderBottomWidth: 2,
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Title',
                  'Date',
                  'Order ID',
                  'Payment Method',
                  'Unit Price',
                  'Total Amount',
                ].map((header) => (
                  <StyledTableCell
                    key={header}
                    sx={{ color: '#9c9c9c' }}
                    align="center"
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {renderTableCell('Title', data.title, 'left')}
                {renderTableCell('Date', formatDate(data.date))}
                {renderTableCell('Order ID', data.orderId)}
                {renderTableCell('Payment Method', 'Credit Card')}
                {renderTableCell('Unit Price', unitPrice)}
                {renderTableCell('Total Amount', data.totalAmount)}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mt: 4, mb: 3, borderBottomWidth: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <InfoBox>
              <Typography variant="body2" sx={{ color: '#9a9a9a', mr: 3 }}>
                Unit Price:
              </Typography>
              <Typography variant="body2">{formatAmount(unitPrice)}</Typography>
            </InfoBox>
            <InfoBox>
              <Typography variant="body2" sx={{ color: '#9a9a9a', mr: 3 }}>
                Tax:
              </Typography>
              <Typography variant="body2">{formatAmount(tax)}</Typography>
            </InfoBox>
          </Box>

          <Box sx={{ mr: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: '#9a9a9a', textAlign: 'right' }}
            >
              Total Amount
            </Typography>
            <Typography sx={{ fontSize: 18, textAlign: 'right' }}>
              {formatAmount(data.totalAmount)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 30,
            right: 30,
            minWidth: '20px',
            width: '20px',
            height: '20px',
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src="/svgs/close-receipt.svg"
            alt="close icon"
            width={22}
            height={22}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptDialog;
