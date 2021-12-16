/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 16 2021
 * @ Time: 22:43
 */

export interface ImageFormats {
  large: ImageSize | null;
  small: ImageSize | null;
  medium: ImageSize | null;
  thumbnail: ImageSize | null;
}

export interface ImageSize {
  ext: string | null;
  url: string | null;
  hash: string | null;
  mime: string | null;
  name: string | null;
  path: null;
  size: number | null;
  width: number | null;
  height: number | null;
}

export interface Author {
  name: string | null;
  avatar: ImageFormats | null;
}

export interface ParsedPost {
  id: string | null;
  title: string | null;
  excerpt: string | null;
  slug: string | null;
  cover: ImageFormats | null;
  date: string | null;
  content: string | null;
  author: Author | null;
}

export type SlugAndPreview = {
  slug?: string | string[];
  preview?: boolean | null;
};
