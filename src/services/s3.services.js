import { apiSvc } from './api.service';
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const s3Svc = {
  async uploadFile(file) {
    const contentType = file?.type === 'image/jpg' ? 'image/jpeg' : file?.type;
    if (!file || !['image/jpeg', 'image/png'].includes(contentType) || !Number.isInteger(file.size) || file.size < 1 || file.size > MAX_IMAGE_BYTES) {
      const error = new Error('Choose a JPEG or PNG image no larger than 8 MB.');
      error.code = 'INVALID_IMAGE';
      throw error;
    }
    const response = await apiSvc.post('uploads', { contentType, size: file.size });
    const grant = response.data.data;
    const form = new FormData();
    for (const [key, value] of Object.entries(grant.fields)) form.append(key, value);
    form.append('file', file);
    const result = await fetch(grant.url, { method: 'POST', body: form, credentials: 'omit' });
    if (!result.ok) {
      const error = new Error('The image upload could not be completed.');
      error.code = 'IMAGE_UPLOAD_FAILED';
      error.response = { status: result.status };
      throw error;
    }
    return { Key: grant.key, Location: grant.publicUrl };
  },
  async getFileStream(key) {
    const path = key.split('/').map(encodeURIComponent).join('/');
    const response = await fetch(`https://marido-image-bucket.s3.us-east-1.amazonaws.com/${path}`, { credentials: 'omit' });
    if (!response.ok) throw new Error('The image could not be loaded.');
    return { Body: new Uint8Array(await response.arrayBuffer()) };
  },
};
