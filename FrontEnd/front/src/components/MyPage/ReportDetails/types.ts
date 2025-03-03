export interface ProblemDetails {
  id: number;
  grade: string;
  subject: string;
  title: string;
  registrationDate: string;
}

export interface AnswerDetails {
  content: string;
}

export interface Report {
  id: number;
  title: string;
  registrationDate: string;
  questionType: string;
  processingResult: string;
  description: string;
  problemDetails: ProblemDetails;
  answerDetails: AnswerDetails[];
}
