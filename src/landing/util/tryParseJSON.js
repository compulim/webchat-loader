export default function tryParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (err) {}
};
