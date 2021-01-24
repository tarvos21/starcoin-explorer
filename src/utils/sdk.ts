// https://www.npmjs.com/package/@starcoin/starcoin
import { providers } from '@starcoin/starcoin';

const nodeUrl = process.env.REACT_APP_STARCOIN_NODE_URL;
const provider = new providers.JsonrpcProvider(nodeUrl);

export async function getTxnData(txnHash: string) {
  const result = await provider.getTransaction(txnHash);
  return result;
}

export async function getAddressData(hash: string) {
  const result = await provider.getResource(hash, '0x1::Account::Account');
  return result;
}

export async function getBalancesData(hash: string) {
  const result = await provider.getBalances(hash);
  return result;
}

export async function getEpochData() {
  const result = await provider.getResource('0x1', '0x1::Epoch::Epoch');
  return result;
}