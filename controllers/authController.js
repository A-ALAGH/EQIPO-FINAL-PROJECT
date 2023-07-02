const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    // Vérifier si le pseudo existe déjà
    const existingUser = await userModel.findOne({ pseudo });
    if (existingUser) {
      return res.status(400).json({ error: 'Le pseudo existe déjà' });
    }

    // Vérifier si l'e-mail existe déjà
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'L\'e-mail existe déjà' });
    }

    // Vérifier la longueur du mot de passe
    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const user = await userModel.create({ pseudo, email, password });
    const token = generateToken(user); // Générer le token JWT
    res.status(201).json({ user: user._id, token }); // Renvoyer le token dans la réponse
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = generateToken(user); // Générer le token JWT
    res.status(200).json({ user, token }); // Renvoyer le token dans la réponse
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports.checkDuplicate = async (req, res) => {
  const { pseudo, email } = req.body;
  try {
    const pseudoExists = await userModel.findOne({ pseudo });
    const emailExists = await userModel.findOne({ email });
    res.status(200).json({ pseudoExists: !!pseudoExists, emailExists: !!emailExists });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fonction pour générer le token JWT
function generateToken(user) {
  const payload = {
    userId: user._id,
    // Autres données que vous souhaitez inclure dans le token
  };

  // Générer le token avec une clé secrète
  const token = jwt.sign(payload, process.env.secretKey, { expiresIn: '1h' });
  return token;
}
