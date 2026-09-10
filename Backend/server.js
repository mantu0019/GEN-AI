import app from "./src/app.js";
import config from "./src/config/config.js";

const port = config.PORT || 5000;
import connectToDb from "./src/config/connectToDb.js";
import dns, { setServers } from "dns";
   dns.setServers(["1.1.1.1","8.8.8.8"])

 

 

connectToDb();
app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
