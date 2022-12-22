export default function isLocalhost(host: string): boolean {
  return /(^|\.)localhost(:|$)/iu.test(host) || /^(127\.0\.0\.1|::1)(:|$)/iu.test(host);
}
