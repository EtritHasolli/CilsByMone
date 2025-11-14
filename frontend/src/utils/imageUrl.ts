/**
 * Formats an image URL for display.
 * Converts Supabase Storage paths (starting with /images/) to full Supabase Storage URLs.
 * 
 * Database format: /images/filename.jpg
 * Converts to: https://[project].supabase.co/storage/v1/object/public/[bucket]/filename.jpg
 */
export function formatImageUrl(imageUrl: string, width?: number, options?: { auto?: string }): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const storageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'images';
  
  let finalUrl = imageUrl;

  // Convert Supabase Storage relative paths to full URLs
  // Handles paths like: /images/1.jpg or images/1.jpg
  if (imageUrl.startsWith('/images/') || imageUrl.startsWith('images/')) {
    if (supabaseUrl) {
      // Remove leading slash and 'images/' prefix to get just the filename
      // Example: /images/1.jpg -> 1.jpg
      const path = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
      const filename = path.replace(/^images\//, ''); // Remove 'images/' prefix if present
      
      // Construct full Supabase Storage URL
      finalUrl = `${supabaseUrl}/storage/v1/object/public/${storageBucket}/${filename}`;
    } else {
      // Fallback: if Supabase URL is not configured, return as-is (for local development)
      return imageUrl;
    }
  }

  // Note: Supabase Storage public URLs don't support query parameters for image transformation
  // If you need image transformations, you would need to use Supabase's Image Transformation API
  // or a service like Cloudinary/ImageKit. For now, we return the URL as-is.
  
  // If the URL is already a full URL (not a Supabase Storage URL), we can append query params
  if ((width || options?.auto) && !finalUrl.includes('supabase.co/storage') && !finalUrl.startsWith('/')) {
    const params = new URLSearchParams();
    if (width) {
      params.set('w', width.toString());
    }
    if (options?.auto) {
      params.set('auto', options.auto);
    }

    const separator = finalUrl.includes('?') ? '&' : '?';
    if (params.toString()) {
      finalUrl = `${finalUrl}${separator}${params.toString()}`;
    }
  }

  return finalUrl;
}

