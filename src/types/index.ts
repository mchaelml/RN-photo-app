import type { ReactNode } from "react";

export type WithChildren<T = unknown> = T & { children: ReactNode };

export type UnArray<T> = T extends Array<infer U> ? U : T;

export interface IPexelApiResponse {
  page: number;
  per_page: number;
  photos: IPexelPhoto[];
  next_page?: string;
  prev_page?: string;
  total_results: number;
}

export interface IPexelPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}
