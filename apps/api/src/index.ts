import "reflect-metadata";
import { createServers } from "./server";
import { log } from "@repo/logger";

const port = process.env.PORT || 3001;
const server = createServers();

server.listen(port, () => {
  log(`api running on ${port}`);
});
