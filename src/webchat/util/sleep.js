export default function sleep(durationInMs = 100) {
  return new Promise(resolve => setTimeout(resolve, durationInMs));
}
