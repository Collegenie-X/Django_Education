import React from 'react';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import FilterSelect from '@/components/Filter/FilterSelect';
import useStoreTypes from '@/hooks/useStoreTypes';
import { GRADES, TYPES_SUBJECT } from '@/config/config';

interface Problem {
  id: number;
  is_view: boolean;
}

interface ProblemUnit {
  id: number;
  name: string;
  subject: string;
  problems: Problem[];
}

interface SectionType {
  id: number;
  name: string;
  subject: string;
  problem_units: ProblemUnit[];
}

interface UnitType {
  id: number;
  name: string;
  subject: string;
  problems: Problem[];
}

interface FilterOptionsProps {
  formData: {
    subject: keyof typeof TYPES_SUBJECT;
    grade: string;
    unit: string;
    detailedSection: string;
    type: string;
    recommended: string;
  };
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  formData,
  handleSelectChange,
}) => {
  const { unitTypes, sectionTypes } = useStoreTypes();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCustomSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    if (name === 'grade' || name === 'type') {
      handleSelectChange({
        target: { name: 'unit', value: '' },
      } as SelectChangeEvent<string>);
    }

    handleSelectChange(event);
  };

  // is_view: true인 문제를 포함하는 유닛만 필터링
  const units = [
    '',
    ...(unitTypes
      ?.filter(
        (unit: UnitType) =>
          (formData?.subject === 'All' || unit.subject === formData.subject) &&
          unit.problems.some((problem) => problem.is_view),
      )
      .map((unit: UnitType) => unit.name) || []),
  ];

  // is_view: true인 문제를 포함하는 상세 섹션만 필터링
  const detailedSections = formData.unit
    ? [
        '',
        ...(sectionTypes
          ?.filter((section: SectionType) => {
            const matchingUnit = section.problem_units.some(
              (pu) => pu.name === formData.unit,
            );
            const hasVisibleProblems = section.problem_units.some((pu) =>
              pu.problems.some((problem) => problem.is_view),
            );

            return matchingUnit && hasVisibleProblems;
          })
          .map((section: SectionType) => section.name) || []),
      ]
    : [];

  return (
    <Box
      sx={{
        display: { sx: 'block', sm: 'flex', md: 'flex' },
        mr: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: { md: 'block', lg: 'flex' }, gap: 1, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: { xs: 1, sm: 1, md: 0 },
          }}
        >
          <FilterSelect
            name="type"
            label="Type"
            width={isMobile ? 160 : 160}
            value={formData.type}
            options={TYPES_SUBJECT[formData?.subject]}
            onChange={handleCustomSelectChange}
          />

          {formData?.subject !== 'SAT' && (
            <Box sx={{ mt: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <FilterSelect
                name="grade"
                label="Grade"
                width={isMobile ? 160 : 140}
                value={formData.grade}
                options={GRADES}
                onChange={handleCustomSelectChange} // custom handler
              />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: { xs: 1, sm: 1, md: 1, lg: 0 },
          }}
        >
          {units.length > 1 && (
            <FilterSelect
              name="unit"
              label="Unit"
              width={isMobile ? 160 : 150}
              value={formData.unit}
              options={units}
              onChange={handleCustomSelectChange}
            />
          )}

          {formData.unit && detailedSections.length > 1 && (
            <Box sx={{ mt: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <FilterSelect
                name="detailedSection"
                label="Detailed Section"
                width={isMobile ? 160 : 160}
                value={formData.detailedSection}
                options={detailedSections}
                onChange={handleCustomSelectChange}
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 2, sm: 2 } }}>
        <FilterSelect
          name="recommended"
          label="Recommended Only"
          width={isMobile ? 160 : 160}
          value={formData.recommended}
          options={['Yes', 'No']}
          onChange={handleCustomSelectChange}
        />
      </Box>
    </Box>
  );
};

export default FilterOptions;
