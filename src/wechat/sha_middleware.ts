const sha1 = require("sha1");
import { wechat } from './config';

interface SignConfig {
  signature: string,
  timestamp: string,
  nonce: string,
  echostr: string,
}

export const judgeSignature = (options: SignConfig) => {
  const { signature, timestamp, nonce } = options;
  const { Token } = wechat;
  const str = [Token, timestamp, nonce].sort().join('');
  const result = sha1(str);
  if(result === signature) {
    return true
  }
  return false
}