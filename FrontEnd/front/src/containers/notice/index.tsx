'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  styled,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFetchNotices } from '@/hooks/useFetchNotices'; // 커스텀 훅 import

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  boxShadow: 'none',
  paddingTop: 15,
  paddingBottom: 15,
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    backgroundColor: '#2BA8FF', // Blue background color when expanded
    color: '#ffffff', // White font color when expanded
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: '8px',
  },
}));

const Notice = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { data: notices, isLoading, error } = useFetchNotices();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '65vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '65vh',
        }}
      >
        <Typography variant="h6" color="error">
          공지사항을 불러오는 중 오류가 발생했습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          mx: 'auto',
          mt: 5,
          maxWidth: 800,
          height: '65vh',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Notice
        </Typography>

        <Stack spacing={2} sx={{ width: '100%', maxWidth: 800, mt: 5 }}>
          {notices.map(
            (
              notice: { id: number; title: string; description: string },
              index: number,
            ) => {
              const panel = index.toString();
              return (
                <CustomAccordion
                  key={notice.id}
                  expanded={expanded === panel}
                  onChange={handleChange(panel)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          px: 2,
                          color: expanded === panel ? '#ffffff' : 'inherit',
                        }}
                      />
                    }
                    aria-controls={`panel${panel}-content`}
                    id={`panel${panel}-header`}
                  >
                    <Typography sx={{ fontSize: 16 }}>
                      {notice.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ mt: -2 }}>
                    <Typography sx={{ fontSize: 14 }}>
                      {notice.description}
                    </Typography>
                  </AccordionDetails>
                </CustomAccordion>
              );
            },
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Notice;
