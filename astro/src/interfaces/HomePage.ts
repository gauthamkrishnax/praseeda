// HomePage API Response Interfaces

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface HeroImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
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

export interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface ParagraphNode {
  type: 'paragraph';
  children: TextNode[];
}

export interface HeadingNode {
  type: 'heading';
  children: TextNode[];
  level: number;
}

export type RichTextNode = ParagraphNode | HeadingNode;

export interface LinkItem {
  id: number;
  LinkTitle: string;
  googleDrive: boolean;
  linkUrl: string | null;
  googleDriveID: string | null;
}

export interface HomePageData {
  id: number;
  documentId: string;
  logo: RichTextNode[];
  heroText: RichTextNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  heroImage: HeroImage;
  linkCollection: LinkItem[];
  localizations: any[];
}

export interface HomePageResponse {
  data: HomePageData;
  meta: Record<string, any>;
}
