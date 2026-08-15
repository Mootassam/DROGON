require("dotenv").config();
import server from "./api";
const PORT = process.env.PORT || 8082;

(async () => {

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
