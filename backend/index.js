import express from "express";
import initDatabase from "./models/initDatabase.js";
import cors from "cors";
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import path from "path";
import __dirname from "./dirname.js";

initDatabase()
  .then(() => {
    const PORT = process.env.PORT || 6000;
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "static")));
    app.use(fileUpload());
    app.use("/api", router);

    app.get("/", (req, res) => {
      res.status(200).json("Server warking");
    });
    app.listen(PORT, () => console.log("Сервер запущен на порту", PORT));
  })
  .catch((error) => {
    console.error("Ошибка инициализации базы данных:", error);
  });
