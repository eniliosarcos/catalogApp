export interface ErrorState {
  message: string;
  code?: string;
  details?: string;
  retryAction?: () => void;
}

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}
