const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.secretKey;

const authMiddleware = (req, res, next) => {
    // Récupérer le token des en-têtes de la requête
    const token = req.headers.authorization.split(' ')[1];
        console.log(secretKey)
    if (token) {
      // Vérifier et décoder le token
      jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
          // Le token est invalide
          res.status(401).json({ error: 'Token invalide' });
        } else {
          // Le token est valide, ajouter les données de l'utilisateur décodées à l'objet de requête
          req.user = decodedToken;
          next(); // Passer au middleware suivant ou à la route
        }
      });
    } else {
      // Le token n'est pas présent
      res.status(401).json({ error: 'Token manquant' });
    }
  };

  module.exports = authMiddleware;
