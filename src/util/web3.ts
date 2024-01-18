/**
 * Convert an ipfs raw URL to an IPFS gateway URL.
 *
 * @param ipfsRaw - In the format of "ipfs://<cid>"
 * @returns A browser-accessible URL pointing to ipfs.io
 */
export function ipfsRawToGatewayUrl(ipfsRaw: string) {
  if (!ipfsRaw) {
    return '';
  }

  return ipfsRaw.replace('ipfs://', "https://ipfs.io/ipfs/");
}