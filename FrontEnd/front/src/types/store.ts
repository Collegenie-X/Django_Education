export interface preview_image {
  id: number;
  image_url: string;
  uploaded_at: string;
}

export interface StoreProps {
  id: number;
  title: string;
  grade?: string;
  subject: string;
  problem_type: string;
  type?: string;
  unit?: string[];
  detailed_section?: string[];
  difficulty: number;
  description: string;
  price: string | number;
  discounted_price?: string | number;
  pages: number;
  problems: number;
  preview_images?: preview_image[];
  is_free: boolean;
  is_wished: boolean;
  is_purchased: boolean;
  file_name: string | null;
  updated_date: string;
  created_date: string;
  total_score?: number;
  total_comments?: number;
  write_user_name: string;
}

export interface StoreSection {
  title: string;
  items: StoreProps[];
  isLoading: boolean;
  error: Error | null;
}

export interface ProblemsApiResponse {
  parameters: {
    problem_type: string | null;
    subject: string | null;
    grade: string | null;
    search: string;
    unit: string | null;
    detailed_section: string | null;
    difficulty: string | null;
  };
  count: number;
  num_pages: number;
  current_page: number;
  page_size: number;
  results: StoreProps[];
}
