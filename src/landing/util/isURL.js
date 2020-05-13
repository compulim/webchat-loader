export default function isURL(url) {
  return /^https?:\/\//.test(url || '');
}
