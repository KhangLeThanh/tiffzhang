import axios from 'axios'
import CryptoJS from 'crypto-js';

const baseUrl = 'https://api.lyyti.com/v2/events'

let date = Math.floor(new Date()/1000);
let private_key = 'a0xyaarpts280gr2vel92eqd39njv0vh'
let public_key = 'qnh8pvlcg0x934ervkiu4tv6ctr30k71'
var Base64 = require('js-base64').Base64;
let signature = CryptoJS.HmacSHA256(
  Base64.encode(public_key+','+date+',events'),
  private_key
).toString(CryptoJS.enc.Hex);

let token = `LYYTI-API-V2 public_key=qnh8pvlcg0x934ervkiu4tv6ctr30k71, timestamp=${date}, signature=${signature}`
const getAll = () => {
  const config = {
    headers: { 
      Accept: 'application/json; charset=utf-8',
      Authorization: token 
  },
  }
  const request = axios.get(baseUrl,config)
  
  return request.then(response => response.data)
}
export default { getAll }