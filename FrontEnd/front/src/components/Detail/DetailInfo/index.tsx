import React from 'react';
import { Box, Divider, useMediaQuery, useTheme } from '@mui/material';
import ViewBadgeSection from './ViewBadgeSection';
import ViewTitleSection from './ViewTitleSection';
import ViewImageTitleSection from './ViewImageTitleSection';
import ViewInformationSection from './ViewInformationSection';
import ViewDescriptionSection from './ViewDescriptionSection';

import { StoreProps } from '@/types/store';
import { SUBJECT_CHOICES } from '@/components/Badge/config';

interface DetailInfoProps {
  store: StoreProps;
}

const DetailInfo: React.FC<DetailInfoProps> = ({ store }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { type, subject } = store;

  const subjectConfig = SUBJECT_CHOICES.find(
    (choice) => choice.value === subject,
  );

  const badges = [
    {
      label: store.write_user_name,
      type: 'user_name',
      backgroundColor: '#E2F2FE',
      color: '#419AFF',
    },
    subjectConfig && {
      label: subjectConfig.label,
      type: 'subject',
      backgroundColor: subjectConfig.backgroundColor,
      color: subjectConfig.color,
    },
    ...(Array.isArray(type)
      ? type.map((t) => ({
          label: t,
          type: 'type',
          backgroundColor: '#F8F8F8',
          color: '#9c9c9c',
        }))
      : type
      ? [
          {
            label: type,
            type: 'type',
            backgroundColor: '#F8F8F8',
            color: '#9c9c9c',
          },
        ]
      : []),
  ].filter(Boolean) as Array<{
    label: string;
    type: string;
    backgroundColor: string;
    color: string;
  }>;

  const informationItems = [
    store.created_date
      ? {
          label: 'Date',
          value: new Date(store.created_date).toLocaleDateString(),
        }
      : null,

    store.grade ? { label: 'Grade', value: store.grade } : null,

    Array.isArray(store.unit) &&
    store.unit.length > 0 &&
    store.unit[0] !== 'None'
      ? { label: 'Unit', value: store.unit.join(', ') }
      : null,

    Array.isArray(store.detailed_section) &&
    store.detailed_section.length > 0 &&
    store.detailed_section[0] !== 'None'
      ? {
          label: 'Detailed Section',
          value: store.detailed_section.join(', '),
        }
      : null,

    {
      label: 'Level of Difficulty',
      value: store.difficulty === 1 ? 'Low' : 'Medium',
    },
    { label: 'Number of Pages', value: `${store.pages} pages` },
    {
      label: 'Number of Questions',
      value: `${store.problems} questions`,
    },
    { label: 'Name of File', value: `${store.file_name || 'N/A'}` }, // 파일명이 null일 경우 'N/A'로 표시
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <Box pt={4} mb={2} sx={{ position: 'relative', px: { sm: 1, lg: 4 } }}>
      <ViewBadgeSection badges={badges} />
      <Box sx={{ mt: { sm: 1, lg: 3 }, ml: 1 }}>
        <ViewTitleSection title={store.title} />
      </Box>

      <Box sx={{ display: { sm: 'block', md: 'flex' }, mt: { sm: 4, md: 5 } }}>
        <ViewImageTitleSection
          title={store.title}
          imageUrl={store?.preview_images?.[0]?.image_url || ''}
          isMobile={isMobile}
        />
        <ViewInformationSection items={informationItems} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <ViewDescriptionSection description={store.description} />
    </Box>
  );
};

export default DetailInfo;
