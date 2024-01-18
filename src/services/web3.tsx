import { Network, Alchemy, OwnedNft } from 'alchemy-sdk';
import axios from 'axios';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

const getNFTs = async (walletAddress: string) => {
  const res = await alchemy.nft.getNftsForOwner(walletAddress || '');

  const nftArray:OwnedNft[] = [];

  await Promise.all(res.ownedNfts.map(async (nft) => {
    let nftObject: any = {};

    if (nft.tokenUri === undefined) {
      return;
    }

    if (!nft.metadataError) {
      nftObject.metadata = nft.rawMetadata;
    }
    else {
      nftObject.metadata = (await axios.get(nft.tokenUri?.gateway as string)).data;
    }

    nftArray.push(nftObject);
  }));

  return nftArray;
};

export default getNFTs;