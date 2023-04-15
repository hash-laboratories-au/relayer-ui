import { fetchLatestFromMainnet, getSubnetHeaderFromMainnet } from "./mainnet.ts";
import { getLatestComittedBlockFromSubnet, getComittedBlockByHeightFromSubnet } from "./subnet";

export const fetchLatest = async() => {
  const { mainnetHash, mainnetHeight } = await fetchLatestFromMainnet();
  const { subnetBlockHash, subnetBlockNumber, subnetBlockRound } = await getLatestComittedBlockFromSubnet();
  
  return {
    scHash: mainnetHash, scHeight: mainnetHeight,
    subnetBlockHash, subnetBlockNumber, subnetBlockRound
  }
};

export const confirmStatus = async(hashToConfirm: string) => {
  const {subnetBlockHeight, committed } = await getSubnetHeaderFromMainnet(hashToConfirm)
  const { subnetBlockHash, committedInSubnet } = await getComittedBlockByHeightFromSubnet(subnetBlockHeight)
  return {
    isCommittedInSmartContract: committed,
    isCommittedInSubnet: committedInSubnet,
    isCommitted: (subnetBlockHash === hashToConfirm) && committed && committedInSubnet
  }
};