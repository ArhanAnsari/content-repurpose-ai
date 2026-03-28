export interface GeneratedContent {
  shorts: string[];
  tweets: string[];
  linkedin: string;
  blog: string[];
}

export interface GenerateResponse {
  data?: GeneratedContent;
  error?: string;
}
