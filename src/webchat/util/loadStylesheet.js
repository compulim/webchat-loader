import createElement from './createElement';

export default function loadStylesheet(href, integrity) {
  document.head.appendChild(
    createElement('link', {
      ...(integrity ? { crossOrigin: 'anonymous', integrity } : {}),
      href,
      rel: 'stylesheet'
    })
  );
}
