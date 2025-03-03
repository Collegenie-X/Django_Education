// SubjectTabs.tsx
import React from 'react';
import {
  Box,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
} from '@mui/material';
import { subjects } from '@/config/config';

interface SubjectTabsProps {
  formData: {
    subject: (typeof subjects)[number];
  };
  handleSubjectChange: (subject: (typeof subjects)[number]) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({
  formData,
  handleSubjectChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Subject Tabs */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 5,
          pb: 2,
        }}
      >
        {isMobile ? (
          // 작은 화면에서는 Select 컴포넌트를 사용
          <Select
            value={formData?.subject}
            onChange={(e) =>
              handleSubjectChange(e.target.value as (typeof subjects)[number])
            }
            variant="standard"
            sx={{ minWidth: 150 }}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        ) : (
          // 큰 화면에서는 기존 버튼 유지
          subjects.map((subject) => (
            <Button
              key={subject}
              onClick={() => handleSubjectChange(subject)}
              sx={{
                fontSize: 16,
                color: formData?.subject === subject ? '#0066CB' : '#9c9c9c',
                borderBottom:
                  formData?.subject === subject ? '3px solid #0066CB' : 'none',
                borderRadius: 0,
                textTransform: 'none',
                px: 1,
                pt: 1,
                pb: 2,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0066CB',
                },
                transition:
                  'color 0.3s, border-bottom 0.3s, margin-bottom 0.3s',
              }}
            >
              {subject}
            </Button>
          ))
        )}
      </Box>
      <Divider sx={{ mt: -2 }} />
    </>
  );
};

export default SubjectTabs;
