import forge from "node-forge";
import { JSEncrypt } from "jsencrypt";

export default function getFormData(val: Object) {
  let fD = new FormData();
  for (const [key, value] of Object.entries(val)) {
    fD.append(key, value);
  }
  return fD;
}

// function encrypt(message: string) {
//   const publicKeyPem = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEIqKz8UVPBuFKwOKgK4zubIXf
// nBR2XJLgkyS1ruQGmC2OVfzoDuL93H+yf70Q0tPZIr8+/VB5OjE7TjhtB7uHi6hp
// 9mDNH7l2eAT8EVeueSQ+s8SiJ+B2GbE0xQtKNWnPtnVgY2xkNtNKYqRwMbLbdHFO
// zUdPwNtnljnCoAXiZQIDAQAB
// -----END PUBLIC KEY-----`;

//   const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

//   console.log("Public Key", publicKey);

//   const encryptedMessage = publicKey.encrypt(
//     forge.util.encodeUtf8(message),
//     "RSA-OAEP",
//     {
//       md: forge.md.sha1.create(),
//     }
//   );

//   console.log("Encrypted: ", encryptedMessage);

//   const encryptedMessageBase64 = forge.util.encode64(encryptedMessage);
//   console.log("Encoded: ", encryptedMessageBase64);
//   return encryptedMessageBase64;
// }

function encrypt(message: string) {
  const publicKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEIqKz8UVPBuFKwOKgK4zubIXf
  nBR2XJLgkyS1ruQGmC2OVfzoDuL93H+yf70Q0tPZIr8+/VB5OjE7TjhtB7uHi6hp
  9mDNH7l2eAT8EVeueSQ+s8SiJ+B2GbE0xQtKNWnPtnVgY2xkNtNKYqRwMbLbdHFO
  zUdPwNtnljnCoAXiZQIDAQAB
  -----END PUBLIC KEY-----`);
  console.log("Public Key", publicKey);

  const encryptedMessage = publicKey.encrypt(
    forge.util.encodeUtf8(message),
    "RSA-OAEP",
    {
      md: forge.md.sha1.create(), // Use SHA-1 for PKCS1_OAEP
      mgf1: {
        md: forge.md.sha1.create(),
      },
    }
  );

  console.log("Encrypted: ", encryptedMessage);
  const encryptedMessageBase64 = forge.util.encode64(encryptedMessage);
  console.log("Encoded: ", encryptedMessageBase64);
}

export function getEncryptedFormData(val: Object) {
  let fD = new FormData();
  for (const [key, value] of Object.entries(val)) {
    if (
      key === "vpnUsername" ||
      key === "vpnPassword" ||
      key === "issmUsername" ||
      key === "issmPassword" ||
      key === "instance"
    ) {
      const msg = value as string;
      console.log("Field", key);
      fD.append(key, encrypt(msg));
    } else fD.append(key, value);
  }
  return fD;
}
