export default function tryParseJSON<T = unknown>(json: string): T | undefined {
  try {
    return JSON.parse(json);
  } catch (err) {}
}
