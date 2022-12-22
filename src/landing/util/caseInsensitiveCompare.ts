export default function caseInsensitiveCompare(x: string, y: string): number {
  x = x && x.toLowerCase();
  y = y && y.toLowerCase();

  return x > y ? 1 : x < y ? -1 : 0;
}
