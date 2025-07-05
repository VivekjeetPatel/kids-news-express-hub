import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("VITE_THIRDWEB_CLIENT_ID is missing in your .env. Wallet provider cannot initialize.");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
