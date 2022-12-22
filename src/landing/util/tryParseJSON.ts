export default function tryParseJSON<T = unknown>(json: string): Readonly<T> | undefined {
  try {
    return Object.freeze(JSON.parse(json));
  } catch (err) {}
}
