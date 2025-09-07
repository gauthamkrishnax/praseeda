import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

/**
 * Downloads and optimizes images from Strapi during build time
 * @param strapiImage - The image object from Strapi
 * @param format - The format to use (thumbnail, small, medium, large)
 * @returns The optimized image path for use in the build
 */
export async function optimizeStrapiImage(
  strapiImage: StrapiImage,
  format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): Promise<{ src: string; alt: string }> {
  if (!strapiImage) {
    console.warn('No image provided to optimizeStrapiImage');
    return { src: '', alt: '' };
  }

  // Determine the image URL to use
  let imageUrl: string;
  if (strapiImage.formats && strapiImage.formats[format]) {
    imageUrl = strapiImage.formats[format].url;
  } else {
    imageUrl = strapiImage.url;
  }

  // Create the full URL
  const fullImageUrl = `${import.meta.env.STRAPI_URL}${imageUrl}`;
  console.log(`Optimizing image: ${fullImageUrl}`);
  
  // Create a unique filename based on the image URL
  const urlParts = imageUrl.split('/');
  const filename = urlParts[urlParts.length - 1];
  const nameWithoutExt = path.parse(filename).name;
  const ext = path.parse(filename).ext;
  const optimizedFilename = `${nameWithoutExt}_${format}${ext}`;
  
  // Create the public directory path
  const publicDir = path.join(__dirname, '../../public/optimized-images');
  const optimizedImagePath = path.join(publicDir, optimizedFilename);
  
  console.log(`Creating directory: ${publicDir}`);
  console.log(`Optimized image path: ${optimizedImagePath}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`Created directory: ${publicDir}`);
  }
  
  // Check if image already exists
  if (fs.existsSync(optimizedImagePath)) {
    console.log(`Image already exists: ${optimizedImagePath}`);
    return {
      src: `/optimized-images/${optimizedFilename}`,
      alt: strapiImage.alternativeText || ''
    };
  }
  
  try {
    console.log(`Downloading image from: ${fullImageUrl}`);
    // Download the image
    const response = await fetch(fullImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Write the image to the public directory
    fs.writeFileSync(optimizedImagePath, buffer);
    console.log(`Successfully saved image to: ${optimizedImagePath}`);
    
    return {
      src: `/optimized-images/${optimizedFilename}`,
      alt: strapiImage.alternativeText || ''
    };
  } catch (error) {
    console.error(`Error optimizing image ${fullImageUrl}:`, error);
    // Fallback to original URL if optimization fails
    return {
      src: fullImageUrl,
      alt: strapiImage.alternativeText || ''
    };
  }
}

/**
 * Optimizes multiple images in parallel
 * @param images - Array of image objects
 * @param format - The format to use for all images
 * @returns Array of optimized image objects
 */
export async function optimizeStrapiImages(
  images: StrapiImage[],
  format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): Promise<Array<{ src: string; alt: string }>> {
  return Promise.all(
    images.map(image => optimizeStrapiImage(image, format))
  );
}
