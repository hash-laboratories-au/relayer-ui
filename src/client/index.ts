import web3 from 'web3';
import { abi } from './utils';

const mainnetUrl = "https://devnetstats.apothem.network/mainnet";
const smartContractAddress = "0x203F7f019401a8B26aA071901dc9dDcfe3611FD4";

var web3Client = new web3(mainnetUrl);
var smartContractInstance = new web3Client.eth.Contract(abi as any, smartContractAddress);

export const fetchLatest = async() => {
  var result = await smartContractInstance.methods.getLatestBlocks().call();

  return { hash: result[1].hash, height: result[1].number};
};

export const confirmStatus = async(hashToConfirm: string) => {
  return await smartContractInstance.methods.getHeaderConfirmationStatus(hashToConfirm).call();
};