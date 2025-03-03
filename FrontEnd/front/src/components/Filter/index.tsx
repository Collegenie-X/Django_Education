import React from 'react';
import { Tabs, Tab, Button, Box } from '@mui/material';

const categories: Array<string | { [key: string]: string[] }> = [
  'All',
  {
    Math: [
      'All',
      'Multiple Choice',
      'Short Answer',
      'Mathematical Modeling',
      'Learning Through Discussion',
      'STEAM',
      'Math Puzzle',
      'Math for Literacy',
    ],
  },
  { Science: ['All', 'Physics', 'Chemistry', 'Biology', 'E.S.S'] },
  { 'Liberal Arts': ['All', 'Multiple Choice', 'Short Answer'] },
  {
    English: [
      'All',
      'Sentence Completion',
      'Text Completion',
      'Reading Comprehension',
    ],
  },
  { STEM: ['All', 'Homeschooling', 'School Classes'] },
  { SAT: ['All', 'Math', 'English'] },
];

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (subCategory: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}) => {
  const handleCategoryClick = (
    event: React.SyntheticEvent,
    newCategory: string,
  ) => {
    setSelectedCategory(newCategory);
    setSelectedSubCategory('All');
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const getSubCategories = () => {
    if (selectedCategory === 'All') {
      return [];
    }
    const categoryObject = categories.find(
      (category) => typeof category !== 'string' && category[selectedCategory],
    ) as { [key: string]: string[] } | undefined;

    return categoryObject ? categoryObject[selectedCategory] : [];
  };

  return (
    <Box>
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryClick}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="category tabs"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none', // 대소문자 유지
            fontWeight: selectedCategory ? 'bold' : 'normal',
            color: '#8c8c8c', // 기본 텍스트 색상
          },
          '& .Mui-selected': {
            color: '#3d3d3d !important', // 선택된 탭 텍스트 색상
            fontWeight: 'bold', // 선택된 탭의 텍스트 굵게
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#8c8c8c', // 선택된 탭 밑줄 색상
            height: 2,
            width: '80%', // 밑줄 두께
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={
              typeof category === 'string' ? category : Object.keys(category)[0]
            }
            value={
              typeof category === 'string' ? category : Object.keys(category)[0]
            }
          />
        ))}
      </Tabs>
      <Box display="flex" justifyContent="flex-start" my={3} ml={1}>
        {getSubCategories().map((subCategory, index) => (
          <Button
            key={index}
            onClick={() => handleSubCategoryClick(subCategory)}
            sx={{
              ml: 1,
              py: 0.5,
              px: 1.5,
              fontSize: 13,
              textTransform: 'none',
              backgroundColor:
                selectedSubCategory === subCategory ? '#E2F2FE' : '#fff',
              color:
                selectedSubCategory === subCategory ? '#59B7FE' : '#9c9c9c',
              borderColor:
                selectedSubCategory === subCategory ? '#59B7FE' : '#ddd',
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            {subCategory}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Filter;
