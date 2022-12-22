import isLocalhost from './isLocalhost';

export default function getDomainURL(domainHost: string, protocol: string): URL {
  if (domainHost) {
    try {
      if (isLocalhost(domainHost) || protocol === 'app service extension insecure') {
        return new URL(`http://${domainHost}/.bot/v3/directline`);
      } else if (protocol === 'app service extension') {
        return new URL(`https://${domainHost}/.bot/v3/directline`);
      }
    } catch (err) {}
  }

  return new URL(`https://directline.botframework.com/v3/directline`);
}
