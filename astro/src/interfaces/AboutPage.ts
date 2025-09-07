export interface AboutPageTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
}

export interface AboutPageHeadingNode {
  type: 'heading';
  children: AboutPageTextNode[];
  level: number;
}

export interface AboutPageParagraphNode {
  type: 'paragraph';
  children: AboutPageTextNode[];
}

export interface AboutPageListItemNode {
  type: 'list-item';
  children: AboutPageTextNode[];
}

export interface AboutPageListNode {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: AboutPageListItemNode[];
}

export type AboutPageRichTextNode = 
  | AboutPageHeadingNode 
  | AboutPageParagraphNode 
  | AboutPageListNode;

export interface AboutPageImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface AboutPageImageFormats {
  thumbnail?: AboutPageImageFormat;
  small?: AboutPageImageFormat;
  medium?: AboutPageImageFormat;
  large?: AboutPageImageFormat;
}

export interface AboutPageImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number;
  height: number;
  formats: AboutPageImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutPageData {
  id: number;
  documentId: string;
  aboutText: AboutPageRichTextNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  portfolioImage: AboutPageImage;
  localizations: any[];
}

export interface AboutPageResponse {
  data: AboutPageData;
  meta: Record<string, any>;
}
