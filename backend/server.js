const app = require("./app");
const mongoose = require("mongoose");

const db_url = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(db_url).then(()=>console.log("Dabase connected...."));
app.listen(process.env.PORT, () =>
  console.log(`✅ Async backend running on port ${process.env.PORT}`)
);