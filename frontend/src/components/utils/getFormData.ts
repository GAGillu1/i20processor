export default function getFormData(val: Object) {
  let fD = new FormData();
  for (const [key, value] of Object.entries(val)) {
    fD.append(key, value);
  }
  return fD;
}
