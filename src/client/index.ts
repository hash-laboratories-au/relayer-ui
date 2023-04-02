import web3 from 'web3';
import { abi } from './utils';

const mainnetUrl = "https://devnetstats.apothem.network/api";
const smartContractAddress = "0xAf39A48f27e0C84DD104c1a8338EA74D63a86B12";

var web3Client = new web3(mainnetUrl);
var smartContractInstance = new web3Client.eth.Contract(abi as any, smartContractAddress);

export const fetchLatest = async() => {
  var result = await smartContractInstance.methods.getLatestBlocks().call();

  return { hash: result[1].hash, height: result[1].number};
};

export const confirmStatus = async(hashToConfirm: string) => {
  return await smartContractInstance.methods.getHeaderConfirmationStatus(hashToConfirm).call();
};