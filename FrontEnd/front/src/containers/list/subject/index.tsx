'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, SelectChangeEvent } from '@mui/material'; // SelectChangeEvent 추가
import SearchInputBar from '@/components/List/SearchInputBar';
import SubjectTabs from '@/components/List/SubjectTabs';
import FilterOptions from '@/components/List/FilterOptions';
import useProblemList from '@/hooks/useSubjectProblemList';
import CardItem from '@/components/Store/CardItem';
import CustomPagination from '@/components/Pagination';
import { StoreProps } from '@/types/store';
import { CONTENT_WIDTH, subjects } from '@/config/config';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchEngine: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<{
    subject: (typeof subjects)[number];
    search: string;
    grade: string;
    unit: string;
    detailedSection: string;
    type: string;
    recommended: string;
  }>({
    subject: subjects[0],
    search: '',
    grade: '',
    unit: '',
    detailedSection: '',
    type: '',
    recommended: 'No',
  });

  const [searchInput, setSearchInput] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // 초기 마운트 여부를 추적하기 위한 useRef
  const isInitialMount = useRef(true);

  // URL 파라미터로부터 formData 및 page 초기화
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const newFormData = { ...formData };
    let initialPage = 1;

    if (params.has('subject')) {
      const subject = params.get('subject');
      if (subject && subjects.includes(subject as (typeof subjects)[number])) {
        newFormData.subject = subject as (typeof subjects)[number];
      }
    }
    if (params.has('search')) {
      newFormData.search = params.get('search') || '';
      setSearchInput(newFormData.search);
    }
    if (params.has('grade')) {
      newFormData.grade = params.get('grade') || '';
    }
    if (params.has('unit')) {
      newFormData.unit = params.get('unit') || '';
    }
    if (params.has('detailed_section')) {
      newFormData.detailedSection = params.get('detailed_section') || '';
    }
    if (params.has('type')) {
      newFormData.type = params.get('type') || '';
    }
    if (params.has('recommended')) {
      newFormData.recommended = params.get('recommended') || 'No';
    }
    if (params.has('page')) {
      const pageParam = parseInt(params.get('page') || '1', 10);
      initialPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    }

    setFormData(newFormData);
    setPage(initialPage);
  }, [searchParams]);

  // formData 또는 page 변경 시 URL 업데이트, 초기 마운트 시 제외
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // 초기 마운트 시 URL 업데이트 건너뜀
    }

    const params = new URLSearchParams();

    if (formData.subject) {
      params.set('subject', formData.subject);
    }
    if (formData.search) {
      params.set('search', formData.search);
    }
    if (formData.grade) {
      params.set('grade', formData.grade);
    }
    if (formData.unit) {
      params.set('unit', formData.unit);
    }
    if (formData.detailedSection) {
      params.set('detailed_section', formData.detailedSection);
    }
    if (formData.type) {
      params.set('type', formData.type);
    }
    if (formData.recommended) {
      params.set('recommended', formData.recommended);
    }

    // 항상 'page'를 URL에 포함
    params.set('page', page.toString());

    router.replace(`/subject?${params.toString()}`);
  }, [formData, page, router]);

  // useProblemList 훅에 formData 및 page 전달
  const { data, error, isLoading, isFetching } = useProblemList(
    {
      subject: formData.subject || undefined,
      search: formData.search || undefined,
      grade: formData.grade || undefined,
      unit: formData.unit || undefined,
      detailed_section: formData.detailedSection || undefined,
      type: formData.type || undefined,
      recommended: formData.recommended || undefined,
    },
    page,
  );

  useEffect(() => {
    console.log('formData:', formData);
  }, [formData]);

  // searchInput이 빈 문자열로 변경될 때 formData.search 업데이트
  useEffect(() => {
    if (searchInput === '') {
      setFormData((prevData) => ({
        ...prevData,
        search: '',
      }));
      setPage(1); // 검색 필터 변경 시 페이지를 1로 초기화
    }
  }, [searchInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const handleSubjectChange = (newValue: (typeof subjects)[number]) => {
    setFormData({
      subject: newValue, // 선택한 새로운 subject
      search: '', // 초기화
      grade: '', // 초기화
      unit: '', // 초기화
      detailedSection: '', // 초기화
      type: '', // 초기화
      recommended: 'No', // 기본 값으로 초기화
    });
    setPage(1); // 필터 변경 시 페이지를 1로 초기화
  };

  const handleOptionSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name as keyof typeof formData]: value,
      ...(name === 'unit' ? { detailedSection: '' } : {}), // unit 변경 시 detailedSection 초기화
    }));

    setPage(1); // 필터 변경 시 페이지를 1로 초기화
  };

  const handleSubmit = () => {
    console.log('Search submitted:', searchInput);
    setFormData((prevData) => ({
      ...prevData,
      search: searchInput, // 검색 버튼 클릭 시에만 search 업데이트
    }));
    setPage(1); // 제출 시 페이지를 1로 초기화
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ pt: 1, px: { lg: 2, xl: 0.5 } }}>
      {/* Subject Tabs */}
      <SubjectTabs
        formData={formData}
        handleSubjectChange={handleSubjectChange}
      />

      {/* Search Input */}
      <Box sx={{ my: 6, width: { lg: '70%', xl: '50%' }, mx: 'auto' }}>
        <SearchInputBar
          formData={{ search: searchInput }}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Box>

      {/* Filter Options */}
      <Box>
        <Typography sx={{ color: '#6c6c6c' }}>
          Search products by selecting sub-categories:
        </Typography>
      </Box>

      <Box sx={{ maxWidth: CONTENT_WIDTH, mx: 'auto', mt: 1 }}>
        <FilterOptions
          formData={formData}
          handleSelectChange={handleOptionSelectChange}
        />
        {data?.results && (
          <Box sx={{ mt: 3, color: '#9c9c9c' }}>
            {`${data?.count} results found.`}
          </Box>
        )}

        {/* Problem List */}
        <Box sx={{ mt: 5, mx: -3 }}>
          {isLoading || isFetching ? (
            <Box sx={{ ml: { xs: 4, sm: 0 } }}>
              <LoadingSkeleton array_columns={4} />
            </Box>
          ) : error ? (
            <Typography color="error" align="center" mt={5}>
              An error occurred while loading data: {error.message}
            </Typography>
          ) : (
            <>
              <Grid container>
                {data?.results.map((item: StoreProps) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2.4}
                    key={item.id}
                  >
                    <CardItem item={item} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box display="flex" justifyContent="center" mt={4}>
                <CustomPagination
                  count={data?.num_pages || 1}
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchEngine;
