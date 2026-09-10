import config from "./config.js";
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey:config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


export default client;