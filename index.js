const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const connect = mongoose
  .connect(
    "mongodb+srv://himan:himan@cluster0.koslt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      auth: {
        user: "himanshu",
        password: "himanshu",
      },
      authSource: "admin",
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("Backend of Movie Finder"));

app.use("/api/users", require("./routes/users"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use("/uploads", express.static("uploads"));

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
