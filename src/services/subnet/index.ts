import Web3 from 'web3';
import { subnetExtensions, Web3WithExtension } from "./extensions";

const subnetUrl = "https://devnetstats.apothem.network/subnet"

var web3Client = new Web3(subnetUrl).extend(subnetExtensions);

export const getLatestComittedBlockFromSubnet = async () => {
  const { Hash, Number, Round }  = await web3Client.xdcSubnet.getV2Block("committed");
  return {
    subnetBlockHash: Hash,
    subnetBlockNumber: Number,
    subnetBlockRound: Round
  };
}

export const getComittedBlockByHeightFromSubnet = async (blockNum: number) => {
  const { Hash, Number, Round, Committed }  = await web3Client.xdcSubnet.getV2BlockByNumber(Web3.utils.numberToHex(blockNum));
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