const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth"); // chamar a route
const protectedRoutes = require("./routes/protected");
const db = require("./models");

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

// app.use(function (req, res, next) { // desativar a cache
//   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//   next();
// });

const PORT = 3000;

// esperar que o servidor mysql esteja operacional
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
delay(2500).then(() =>
  db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(authRoutes);

app.use(protectedRoutes);
