export default function isLocalhostURL(urlString: string): boolean {
  try {
    const { hostname } = new URL(urlString);

    return hostname === '127.0.0.1' || hostname === 'localhost' || hostname.endsWith('.localhost');
  } catch (error) {
    return false;
  }
}
