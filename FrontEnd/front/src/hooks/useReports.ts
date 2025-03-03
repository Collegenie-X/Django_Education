// src/hooks/useReports.ts

import { useQuery } from '@tanstack/react-query';
import { getReportList } from '@/api/ApiPayments';
import { formatDate } from '@/utiles/formatDate';

// Define interfaces for ProblemDetails and AnswerDetails
interface ProblemDetails {
  id: number;
  title: string;
  grade: string | null;
  subject: string;
  type: string;
}

interface AnswerDetails {
  content: string;
  // Add other relevant fields if available
}

interface Report {
  id: number;
  title: string;
  registrationDate: string;
  questionType: string;
  processingResult: string;
  description: string;
  problemDetails: ProblemDetails;
  answerDetails: AnswerDetails[];
}

const fetchReports = async (): Promise<Report[]> => {
  const response = await getReportList();

  // Ensure response.data is an array
  if (!response.data || !Array.isArray(response.data)) {
    throw new Error('Invalid report list data');
  }

  return response.data.map((report: any) => ({
    id: report.id,
    title: report.title,
    registrationDate: formatDate(report.registration_date),
    questionType: report.question_type,
    processingResult: report.processing_status,
    description: report.description,
    problemDetails: {
      id: report.problem_details.id,
      title: report.problem_details.title,
      grade: report.problem_details.grade,
      subject: report.problem_details.subject,
      type: report.problem_details.type,
    },
    answerDetails: report.answer_details.map((answer: any) => ({
      content: answer.content,
      // Map other fields if necessary
    })),
  }));
};

const useReports = () => {
  const { data, isLoading, isError, error } = useQuery<Report[], Error>({
    queryKey: ['reports'],
    queryFn: fetchReports,
    staleTime: 60 * 1000 * 5, // 5 minutes
    retry: 2, // Retry twice on failure
  });

  return {
    reportsData: data || [], // Return empty array if data is undefined
    loading: isLoading,
    error: isError ? error.message : null, // Return error message if there's an error
  };
};

export default useReports;
