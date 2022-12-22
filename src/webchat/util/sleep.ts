export default function sleep(durationInMs: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, durationInMs));
}
