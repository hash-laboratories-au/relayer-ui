import web3 from 'web3';
import { abi } from '../utils';
import { extensions } from "../extensions";

const mainnetUrl = "https://devnetstats.apothem.network/mainnet";
const smartContractAddress = "0x4DcbE9858E5d3fc14B5B57B6f01934B3ec16b421";

const web3Client = new web3(mainnetUrl).extend(extensions);
const smartContractInstance = new web3Client.eth.Contract(abi as any, smartContractAddress);

export const fetchLatestFromMainnet = async() => {
  try {
    const result = await smartContractInstance.methods.getLatestBlocks().call();
    return { mainnetHash: result[1].hash, mainnetHeight: result[1].number};  
  } catch (error) {
    console.error("Error while trying to fetchLatestFromMainnet", error);
    throw error;
  }  
};

export const getSubnetHeaderFromMainnet = async (hash: string) => {
  const result = await smartContractInstance.methods.getHeader(hash).call();
  const isMainnetBlockCommitted = await checkMainnetBlockIsCommitted(result[3])
  return {
    subnetBlockHeight: result[1],
    committed: result[4] && isMainnetBlockCommitted,
    mainnetBlockHeight: result[3]
  }
}

const checkMainnetBlockIsCommitted = async (blockNum: number) => {
  const result = await web3Client.xdc.getV2BlockByNumber(web3.utils.numberToHex(blockNum));
  return result.Committed
}