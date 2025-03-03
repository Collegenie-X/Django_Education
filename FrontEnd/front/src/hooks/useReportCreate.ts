// src/hooks/useReport.ts

import { useState } from 'react';
import { CreateReport } from '@/api/ApiPayments';
import { useQueryClient } from '@tanstack/react-query';

interface UseReportReturn {
  createReport: (
    problem: number,
    payment: number,
    title: string,
    description: string,
    question_type: 'Incorrect Answer' | 'Defective' | 'Suggestion',
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useReport = (): UseReportReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const createReport = async (
    problem: number,
    payment: number,
    title: string,
    description: string,
    question_type: 'Incorrect Answer' | 'Defective' | 'Suggestion',
  ) => {
    setLoading(true);
    setError(null);
    try {
      await CreateReport(problem, payment, title, description, question_type);
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    createReport,
    loading,
    error,
  };
};
