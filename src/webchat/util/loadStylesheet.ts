import createElement from './createElement';

export default function loadStylesheet(href: string, integrity?: string): void {
  document.head.appendChild(
    createElement('link', {
      ...(integrity ? { crossOrigin: 'anonymous', integrity } : {}),
      href,
      rel: 'stylesheet'
    })
  );
}
