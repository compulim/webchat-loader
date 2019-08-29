import random from 'math-random';

export default function generateUserId(directLinePrefix = false) {
  return `${ directLinePrefix ? 'dl' : 'r' }_${ random().toString(36).substr(2) }`;
}
