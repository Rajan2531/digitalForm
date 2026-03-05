const app = require("./app");
const mongoose = require("mongoose");

const db_url = process.env.DB_URL_1.replace("<PASSWORD>", process.env.DB_PASSWORD_1);
mongoose.connect(db_url).then(()=>console.log("Dabase connected...."));
app.listen(process.env.PORT, () =>
  console.log(`✅ Async backend running on port ${process.env.PORT}`)
);