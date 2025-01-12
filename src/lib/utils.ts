import imageCompression, { Options } from "browser-image-compression";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
  if (!link) return "";

  return link
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
    .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
  const compressPromises = files.map(async (file) => {
    try {
      return await compressImage(file);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  return (await Promise.all(compressPromises)).filter((file) => file !== null);
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const options: Options = {
      maxSizeMB: 0.2, // 200KB
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/*",
    };

    imageCompression(file, options).then(resolve).catch(reject);
  });
};

export function formatUrl(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

export function triggerImageInput(id: string) {
  document.getElementById(id)?.click();
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    return imageURL;
  }
  return null;
}
