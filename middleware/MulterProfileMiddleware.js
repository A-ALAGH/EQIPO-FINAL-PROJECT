const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const fileName = `${uuidv4()}_${path.extname(file.originalname)}`;
    updateFileList(fileName);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const updateFileList = (fileName) => {
  // Charger la liste des fichiers existants à partir du fichier texte (s'il existe)
  let fileList = [];
  try {
    const fileListData = fs.readFileSync("./public/images/files.txt", "utf-8");
    fileList = fileListData.split("\n");
  } catch (err) {
    // Le fichier n'existe pas encore ou une erreur s'est produite lors de la lecture
  }

  // Supprimer les fichiers précédents
  fileList.forEach((file) => {
    const filePath = `./public/images/${file}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  // Enregistrer le nouveau nom de fichier dans la liste
  fileList.push(fileName);
  
  // Enregistrer la liste mise à jour dans le fichier texte
  fs.writeFileSync("./public/images/files.txt", fileList.join("\n"), "utf-8");
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = uploadMiddleware;
