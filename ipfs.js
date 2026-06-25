const { create } = require('kubo-rpc-client');
//you need to run the IPFS daemon locally for this to work. You can start it with the command: `ipfs daemon` in your terminal.
const client = create({ url: 'http://127.0.0.1:5001' });

async function addToIpfs(buffer) {
  const { cid } = await client.add(buffer);
  return cid.toString();
}

async function getFromIpfs(cid) {
  const chunks = [];
  for await (const chunk of client.cat(cid)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

module.exports = { addToIpfs, getFromIpfs };
