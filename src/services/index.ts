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
  if (!committed) return false;
  const { subnetBlockHash, committedInSubnet } = await getComittedBlockByHeightFromSubnet(subnetBlockHeight)
  if (!committedInSubnet) return false;
  return subnetBlockHash === hashToConfirm
};