export function uploadedImageUrl(key) {
  if (typeof key !== 'string' || !/^users\/[1-9]\d*\/[0-9a-f-]{36}\.(jpg|png)$/.test(key)) return null;
  return `https://marido-image-bucket.s3.us-east-1.amazonaws.com/${key.split('/').map(encodeURIComponent).join('/')}`;
}
