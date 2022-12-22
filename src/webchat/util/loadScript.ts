import createElement from './createElement';

export default function loadScript(src: string, integrity?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    document.head.appendChild(
      createElement('script', {
        async: true,
        ...(integrity ? { crossOrigin: 'anonymous', integrity } : {}),
        onError: reject,
        onLoad: resolve,
        src
      })
    );
  });
}
