export default function isURL(url: string): boolean {
  return /^https?:\/\//.test(url || '');
}
