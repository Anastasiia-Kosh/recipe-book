const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Оберіть зображення у форматі JPG, PNG, WEBP або GIF";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Розмір зображення не повинен перевищувати 4 МБ";
  }

  return null;
}