export function getAssetUrl(path: string | undefined | null): string {
  if (!path || path.trim() === '') {
    return 'https://monumental-salamander-1557fa.netlify.app/logo.png';
  }
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `https://monumental-salamander-1557fa.netlify.app${clean}`;
}
