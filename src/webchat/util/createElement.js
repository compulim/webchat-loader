const NON_PIXEL_STYLES = ['flex', 'z-index', 'zoom'];

export default function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach(name => {
    const value = attributes[name];

    if (name === 'className') {
      element.className = attributes.className;
    } else if (/^on[A-Z]/.test(name)) {
      element.addEventListener(name.substr(2).toLowerCase(), value.bind(element));
    } else if (name === 'style') {
      const { style } = attributes;
      const styleStrings = [];

      Object.keys(style).forEach(name => {
        let value = style[name];
        const normalizedName = name.replace(/[A-Z]/gu, c => `-${c.toLowerCase()}`);

        if (NON_PIXEL_STYLES.includes(normalizedName)) {
          value += '';
        }

        styleStrings.push(`${normalizedName}: ${typeof value === 'number' ? `${value}px` : value}`);
      });

      element.setAttribute(name, styleStrings.join('; '));
    } else if (typeof value === 'boolean') {
      value && element.setAttribute(name, '');
    } else if (typeof value !== 'undefined') {
      element.setAttribute(name, value);
    }
  });

  if (children.length) {
    const fragment = document.createDocumentFragment();

    children.forEach(child => fragment.appendChild(typeof child === 'string' ? document.createTextNode(child) : child));
    element.appendChild(fragment);
  }

  return element;
}
