const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await userModel.create({ pseudo, email, password });
    const token = generateToken(user); // Générer le token JWT
    res.status(201).json({ user: user._id, token }); // Renvoyer le token dans la réponse
  } catch (err) {
    res.status(400).send(err);
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

// Fonction pour générer le token JWT
function generateToken(user) {
  const payload = {
    userId: user._id,
    // Autres données que vous souhaitez inclure dans le token
  };

  // Générer le token avec une clé secrète
  const token = jwt.sign(payload, 'votre_clé_secrète', { expiresIn: '1h' });
  return token;
}
