const mongoose = require("mongoose");

const MONGO_URL = 'mongodb+srv://mangeshsang:8Bfvc3qZFz5305Fw@test-db.zxlr3em.mongodb.net/?retryWrites=true&w=majority&appName=test-db'

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready! ");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {});
}

module.exports = {
  mongoConnect,
};
