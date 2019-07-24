export default function generateUserId() {
  return `dl_${ Math.random().toString(36).substr(2) }`;
}
