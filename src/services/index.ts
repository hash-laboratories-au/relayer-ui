import { fetchLatestFromMainnet, getSubnetHeaderFromMainnet } from "./mainnet.ts";
import { getLatestComittedBlockFromSubnet, getComittedBlockByHashFromSubnet, getLatestBlocksFromSubnet } from "./subnet";

const NUM_OF_LAST_BLOCKS_TO_SHOW = 10;

export const fetchLatest = async() => {
  const { mainnetHash, mainnetHeight } = await fetchLatestFromMainnet();
  const { subnetBlockHash, subnetBlockNumber, subnetBlockRound } = await getLatestComittedBlockFromSubnet();
  
  return {
    scHash: mainnetHash, scHeight: mainnetHeight,
    subnetBlockHash, subnetBlockNumber, subnetBlockRound
  }
};

export const confirmStatus = async(hashToConfirm: string) => {
  const { committed } = await getSubnetHeaderFromMainnet(hashToConfirm)
  const { committedInSubnet } = await getComittedBlockByHashFromSubnet(hashToConfirm)
  return {
    isCommittedInSmartContract: committed,
    isCommittedInSubnet: committedInSubnet,
    isCommitted: committed && committedInSubnet
  }
};

export const bulkGetLatestStatus = async () => {
  const latestSubnetBlocks = await getLatestBlocksFromSubnet(NUM_OF_LAST_BLOCKS_TO_SHOW);
  const blocksStatus = await Promise.all(latestSubnetBlocks.map(async (b) => {
    const { committed } = await getSubnetHeaderFromMainnet(b.subnetBlockHash);
    return {
      ...b,
      committedInMainnet: committed as boolean
    }
  }));
  return blocksStatus;
}