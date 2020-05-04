import createElement from './createElement';

export default function loadScript(src, integrity) {
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
