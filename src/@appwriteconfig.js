import { Client, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6683ca9600287b282c31");
export const account = new Account(client);
export default client;
