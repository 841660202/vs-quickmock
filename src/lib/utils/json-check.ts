export default function jsonIsValid(json: string) {
  try {
      JSON.parse(json);
  } catch (e) {
      return false;
  }
  return true;
}