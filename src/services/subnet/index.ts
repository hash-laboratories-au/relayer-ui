import Web3 from 'web3';
import { extensions } from "../extensions";

const subnetUrl = "https://devnetstats.apothem.network/subnet"

var web3Client = new Web3(subnetUrl).extend(extensions);

export const getLatestComittedBlockFromSubnet = async () => {
  const { Hash, Number, Round }  = await web3Client.xdc.getV2Block("committed");
  return {
    subnetBlockHash: Hash,
    subnetBlockNumber: Number,
    subnetBlockRound: Round
  };
}

export const getComittedBlockByHashFromSubnet = async (blockHash: String) => {
  const { Hash, Number, Round, Committed }  = await web3Client.xdc.getV2BlockByHash(blockHash);
  if (!Hash || !Number ) {
    console.error("Invalid block hash or height or encodedRlp or ParentHash received", Hash, Number);
    throw new Error("Unable to get committed block information by height from subnet");
  }
  return {
    subnetBlockHash: Hash,
    subnetBlockNumber: Number,
    subnetBlockRound: Round,
    committedInSubnet: Committed
  };
}

export const getLatestBlocksFromSubnet = async (last: number = 1): Promise<{subnetBlockHash: string, subnetBlockNumber: number, committedInSubnet: boolean}[]> => {
  try {
    const { Number: latestBlockHeight }: { Number: number }  = await web3Client.xdc.getV2Block("latest");
    const latestBlocksInfoPromises = [];
    
    for (let index = 0; index < last; index++) {
      const heightToFetch = latestBlockHeight - index;
      latestBlocksInfoPromises.push(web3Client.xdc.getV2BlockByNumber(Web3.utils.numberToHex(heightToFetch)));
    }
    
    const latestBlocksInfo = await Promise.all(latestBlocksInfoPromises);
    return latestBlocksInfo.map(i => {
      const { Hash, Number, Committed } = i;
      if (!Hash || !Number ) {
        console.error("[getLatestBlocksFromSubnet] Invalid block hash or height or encodedRlp or ParentHash received", Hash, Number);
        throw new Error("Unable to get v2 block information by height from subnet");
      }
      return ({
        subnetBlockHash: Hash,
        subnetBlockNumber: Number,
        committedInSubnet: Committed
      })
    });  
  } catch (error) {
    console.error("Error while getLatestBlocksFromSubnet", error)
    throw error;
  }
  
}
