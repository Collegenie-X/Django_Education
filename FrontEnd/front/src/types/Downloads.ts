// types/Downloads.ts

// User Interface
export interface DownloadUser {
  email: string;
}

// Problem Detail Unit Interface
export interface ProblemDetailUnit {
  name: string;
}

// Problem Detail Interface
export interface ProblemDetail {
  id: number;
  title: string;
  subject: string;
  grade: string | null;
  is_free: boolean;
  problem_type: string;
  type?: string;
  unit: ProblemDetailUnit[];
  price: string,
  discounted_price : string
}

// Download Interface
export interface Download {
  id: number;
  user: DownloadUser;
  problem: number;
  problem_detail: ProblemDetail;
  downloaded_at: string;
  download_url?: string;
}

// Pagination Meta Interface
export interface PaginationMeta {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Get and Create Downloads Response Interface
export interface DownloadsListResponse extends PaginationMeta {
  results: Download[];
}

// Delete Download Response Interface
export interface DeleteDownloadResponse extends PaginationMeta {
  results: {
    detail: string;
    data: Download[];
  };
}
