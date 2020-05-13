export default function isLocalhost(host) {
  return host === 'localhost' || (host || '').startsWith('localhost:');
}
