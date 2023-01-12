export default function promisify<T = unknown, E = any>(
  callback: (callback: (error: E, result: T) => void) => void
): () => Promise<T> {
  return () =>
    new Promise<T>((resolve, reject) => {
      callback((err, result) => (err ? reject(err) : resolve(result)));
    });
}
