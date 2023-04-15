import web3 from 'web3';
import { abi } from '../utils';

const mainnetUrl = "https://devnetstats.apothem.network/mainnet";
const smartContractAddress = "0x2EE8Ba69eBadA17F4a06A13F5Ff8819cb7b018eF";

var web3Client = new web3(mainnetUrl);
var smartContractInstance = new web3Client.eth.Contract(abi as any, smartContractAddress);

export const fetchLatestFromMainnet = async() => {
  var result = await smartContractInstance.methods.getLatestBlocks().call();

  return { mainnetHash: result[1].hash, mainnetHeight: result[1].number};
};

export const getSubnetHeaderFromMainnet = async (hash: string) => {
  const result = await smartContractInstance.methods.getHeader(hash).call();
  return {
    subnetBlockHeight: result[1],
    committed: result[4]
  }
}