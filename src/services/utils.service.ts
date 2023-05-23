import crypto from "crypto";

function getHash(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}

export { getHash };
