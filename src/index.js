const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const connectDB = require("./db/connectionDB");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

start();
