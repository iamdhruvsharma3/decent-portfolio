import ngrok from "ngrok";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    const url = await ngrok.connect({
      addr: process.env.PORT || 3000,
      authtoken: process.env.NGROK_AUTHTOKEN,
      bind_tls: true, // ensures https
    });
    console.log("Ngrok tunnel running at:", url);
  } catch (err) {
    console.error("Error starting ngrok:", err);
  }
})();
