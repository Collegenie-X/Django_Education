'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import useCardPaymentWidget from './useCardPaymentWidget';
import usePaypalPaymentWidget from './usePaypalPaymentWidget';
import { formatAmount } from '@/utiles/paymentList';
import { KOREA_WON_MONEY } from './config';
import { v4 as uuidv4 } from 'uuid';
import { cookieUtils } from '@/utiles/cookieUtils';

interface PaymentAgreeDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onClose: () => void;
  price: number;
  title: string;
  problemId: string;
}

interface PaymentButtonProps {
  method: 'card' | 'paypal';
  selectedMethod: 'card' | 'paypal' | null;
  setSelectedMethod: (method: 'card' | 'paypal') => void;
  children: React.ReactNode;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  method,
  selectedMethod,
  setSelectedMethod,
  children,
}) => {
  return (
    <Button
      onClick={() => setSelectedMethod(method)}
      sx={{
        fontSize: {
          sx: method === 'card' ? 10 : 12,
          sm: method === 'card' ? 14 : 16,
        },
        letterSpacing: method === 'card' ? '-0.05em' : '0.01em',
        wordSpacing: '-0.01em',

        backgroundColor:
          selectedMethod === method
            ? 'var(--color-blue-main)'
            : 'var(--color-white)',
        color:
          selectedMethod === method
            ? 'var(--color-white)'
            : 'var(--color-blue-main)',
        border: '1px solid var(--color-blue-main)',
        borderRadius: '12px',
        mx: 1,
        px: { xs: 3, sm: 6 },
        textTransform: 'none',
        '&:hover': {
          backgroundColor:
            selectedMethod === method
              ? 'var(--color-blue-main)'
              : 'var(--color-white)', // Hover 시 배경색
          color:
            selectedMethod === method
              ? 'var(--color-white)'
              : 'var(--color-blue-main)', // Hover 시 글자색
        },
      }}
    >
      {children}
    </Button>
  );
};

const PaymentAgreeDialog: React.FC<PaymentAgreeDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  onClose,
  price,
  title,
  problemId,
}) => {
  const [isAgreeButtonEnabled, setIsAgreeButtonEnabled] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'card' | 'paypal' | null
  >(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserName(cookieUtils.getCookie('username') || 'Guest');
      setUserEmail(cookieUtils.getCookie('email') || 'guest@example.com');
    }
  }, []);

  const customerKey = `studyOLA_${uuidv4().slice(0, 20)}`;
  const orderId = `studyOLA_${uuidv4().slice(0, 12)}___${problemId}`;

  const successUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/store/${problemId}`;
  const failUrl = `${process.env.NEXT_PUBLIC_HOME_URL}/store/${problemId}`;
  const orderName = `${title}($${price})`;

  const { requestPayment: requestCardPayment, renderWidget: renderCardWidget } =
    useCardPaymentWidget(
      Math.round(price * KOREA_WON_MONEY),
      customerKey,
      orderId,
      orderName,
      userName,
      userEmail,
      successUrl,
      failUrl,
    );

  const {
    requestPayment: requestPaypalPayment,
    renderWidget: renderPaypalWidget,
  } = usePaypalPaymentWidget(
    price,
    customerKey,
    orderId,
    orderName,
    userName,
    userEmail,
    successUrl,
    failUrl,
  );

  useEffect(() => {
    if (selectedPaymentMethod === 'card') {
      renderCardWidget();
    } else if (selectedPaymentMethod === 'paypal') {
      renderPaypalWidget();
    }
  }, [selectedPaymentMethod, renderCardWidget, renderPaypalWidget]);

  const handlePayment = () => {
    if (selectedPaymentMethod === 'card') {
      requestCardPayment();
    } else if (selectedPaymentMethod === 'paypal') {
      requestPaypalPayment();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setIsAgreeButtonEnabled(false);
    setSelectedPaymentMethod(null);
  };

  const handleImageClick = () => {
    setIsAgreeButtonEnabled(!isAgreeButtonEnabled);
  };

  const onCloseClick = () => {
    onClose();
    setIsAgreeButtonEnabled(false);
    setSelectedPaymentMethod(null);
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ py: 2, borderRadius: 20, width: { xs: 340, sm: 480 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 30, ml: 2, mt: -2 }}>
          Your Choice
        </DialogTitle>
        <Box
          onClick={handleImageClick}
          sx={{
            backgroundColor: isAgreeButtonEnabled
              ? 'var(--color-blue-2)'
              : 'var(--color-white)',
            border: '1px solid var(--color-blue-main)',
            borderRadius: '20px',
            width: { xs: 280, sm: 380, md: 380 },
            py: 3,
            px: 5,
            mx: 'auto',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
            <Typography
              sx={{
                fontSize: 28,
                marginLeft: '10px',
              }}
            >
              $ {price.toFixed(2)}{' '}
            </Typography>

            {selectedPaymentMethod === 'card' && (
              <Typography
                sx={{
                  color: 'var(--color-gray-4)',
                  fontSize: 18,
                  mt: { xs: -1, sm: 1 },
                  mb: { xs: 1, sm: 0 },
                  ml: 1,
                }}
              >
                ({formatAmount(Math.round(price * KOREA_WON_MONEY))}){' '}
              </Typography>
            )}
          </Box>

          <Typography
            sx={{
              marginBottom: '16px',
              fontSize: 13,
              marginLeft: '10px',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Payment
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mx: 3 }}>
            <PaymentButton
              method="paypal"
              selectedMethod={selectedPaymentMethod}
              setSelectedMethod={setSelectedPaymentMethod}
            >
              Paypal
            </PaymentButton>

            <PaymentButton
              method="card"
              selectedMethod={selectedPaymentMethod}
              setSelectedMethod={setSelectedPaymentMethod}
            >
              Korean Credit Card
            </PaymentButton>
          </Box>
        </Box>

        {selectedPaymentMethod && (
          <Box
            sx={{
              height: 'auto',
              mt: 2,
            }}
          >
            <div
              id="payment-method"
              style={{
                textAlign: 'center',
                display: 'block',
              }}
            />
            <div
              id="agreement"
              style={{
                textAlign: 'center',
                display: 'none',
              }}
            />

            <Typography
              sx={{ display: 'flex', alignItems: 'center', mb: 4, ml: 3 }}
            >
              <Button
                onClick={handleImageClick}
                sx={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  mr: 2,
                }}
              >
                {isAgreeButtonEnabled ? (
                  <Image
                    src="/svgs/pricing-option.svg"
                    alt="pricingoption icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/svgs/pricing-option-disable.svg"
                    alt="pricingoption icon"
                    width={24}
                    height={24}
                  />
                )}
              </Button>

              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: { xs: 12, sm: 15 },
                  textDecoration: 'underline',
                  color: 'var(--color-gray-4)',
                }}
              >
                I have read and agree to the Terms of Service.
              </Link>
            </Typography>

            <Button
              onClick={handlePayment}
              sx={{
                borderRadius: '12px',
                color: isAgreeButtonEnabled
                  ? 'var(--color-white)'
                  : 'var(--color-gray-3)',
                backgroundColor: isAgreeButtonEnabled
                  ? 'var(--color-blue-main)'
                  : 'var(--color-gray-1)',
                textTransform: 'none',
                fontSize: { xs: 16, sm: 20 },
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                mx: 'auto',
                '&:hover': {
                  backgroundColor: isAgreeButtonEnabled
                    ? 'var(--color-blue-main)'
                    : 'var(--color-gray-1)',
                },
              }}
              disabled={!isAgreeButtonEnabled}
            >
              Confirm
            </Button>
          </Box>
        )}
      </Box>
      <DialogActions>
        <Button
          onClick={onCloseClick}
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            minWidth: '24px',
            width: '22px',
            height: '22px',
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src="/svgs/close-receipt.svg"
            alt="close icon"
            width={18}
            height={18}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentAgreeDialog;
