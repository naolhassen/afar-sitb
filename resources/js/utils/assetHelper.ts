export function getAssetUrl(path: string | undefined | null): string {
  if (!path || path.trim() === '') {
    return '/logo.png';
  }
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
}
