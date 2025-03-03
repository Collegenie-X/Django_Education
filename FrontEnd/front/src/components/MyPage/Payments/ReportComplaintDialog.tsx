// src/components/ReportComplaintDialog.tsx

'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import { useReport } from '@/hooks/useReportCreate';
import { useRouter } from 'next/navigation';

interface ReportComplaintDialogProps {
  problem_id: string;
  payment_id: string;
  open: boolean;
  onClose: () => void;
}

const ReportComplaintDialog: React.FC<ReportComplaintDialogProps> = ({
  problem_id,
  payment_id,
  open,
  onClose,
}) => {
  const [issue, setIssue] = useState<
    'Incorrect Answer' | 'Defective' | 'Suggestion'
  >('Suggestion');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const { createReport, loading, error } = useReport();

  const router = useRouter();

  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (open) {
      mainContent?.setAttribute('aria-hidden', 'true');
    } else {
      mainContent?.removeAttribute('aria-hidden');
    }

    return () => {
      mainContent?.removeAttribute('aria-hidden');
    };
  }, [open]);

  const handleSubmit = async () => {
    if (!title || !detail || !issue) {
      alert('Please fill out all the fields');
      return;
    }
    try {
      await createReport(
        parseInt(problem_id, 10),
        parseInt(payment_id, 10),
        title,
        detail,
        issue,
      );
      onClose();
      router.push('/my-page/reports'); // success page로 이���합니다.
      // 성공 시 다이얼로그를 닫습니다.
    } catch (err) {
      console.error('Failed to submit the report', err);
      alert('Failed to submit the report');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: { sm: 16, md: 20 } }}>
          StudyOLA Report a Complaint
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Box>
            <Typography> Issue </Typography>
            <TextField
              select
              value={issue}
              onChange={(e) =>
                setIssue(
                  e.target.value as
                    | 'Incorrect Answer'
                    | 'Defective'
                    | 'Suggestion',
                )
              }
              fullWidth
              margin="normal"
              sx={{
                mt: 1,
                backgroundColor: '#FFFFFF',
                '& .MuiInputBase-input': {
                  color: '#000000',
                  fontSize: { sm: 14, md: 16 }, // fontSize를 input 요소에 적용
                },
              }}
            >
              <MenuItem value="Incorrect Answer">Incorrect Answer</MenuItem>
              <MenuItem value="Defective">Defective</MenuItem>
              <MenuItem value="Suggestion">Suggestion</MenuItem>
            </TextField>
          </Box>

          <Box>
            <Typography> Title </Typography>

            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Please write a title."
              sx={{
                mt: 1,
                backgroundColor: '#FFFFFF',
                '& .MuiInputBase-input': {
                  color: '#000000',
                  fontSize: { sm: 14, md: 16 }, // fontSize를 input 요소에 적용
                },
              }}
            />
          </Box>

          <Box>
            <Typography> Detail </Typography>

            <TextField
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
              multiline
              placeholder="Please write about the issue."
              rows={5}
              margin="normal"
              sx={{
                mt: 1,
                backgroundColor: '#FFFFFF',
                '& .MuiInputBase-input': {
                  color: '#000000',
                  fontSize: { sm: 14, md: 16 }, // fontSize를 input 요소에 적용
                },
              }}
            />
            <Typography sx={{ color: '#cecece', fontSize: { sm: 12, md: 14 } }}>
              {' '}
              Please check “Report Details” for answers to the questions above.
            </Typography>
          </Box>
        </Stack>

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            borderRadius: '12px',
            color: 'var(--color-white)',
            backgroundColor: 'var(--color-blue-main)',
            textTransform: 'none',
            fontSize: '18px',
            width: '100%',
            mx: 'auto',
            '&:hover': {
              backgroundColor: 'var(--color-blue-main)',
            },
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', mx: 2, mb: 2 }}>
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

export default ReportComplaintDialog;
