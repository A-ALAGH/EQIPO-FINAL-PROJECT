const userModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectID

module.exports.getAllUsers = async (req , res) =>{
    const users = await userModel.find().select("-password");
    res.status(200).json(users)
}

module.exports.infoUser = async (req,res) =>{
    try {
    const user = await userModel.findById(req.params.userId).select('-password');
    if (!user) return res.status(400).send('ID unknownfff'+ req.params.id);
    res.send(user);
    } catch (err) {
    console.log('ID unknown:'+ err);
    }
   }
   module.exports.updateUser = async (req, res) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: {
            bio: req.body.bio
          }
        },
        {
          new: true,
          upsert: true,
          setDefaultOnInsert: true
        }
      );
  
      if (!user) {
        return res.status(400).send('ID unknown: ' + req.params.id);
      }
  
      res.send(user);
    } catch (err) {
      console.log('Something went wrong: ' + err);
      res.status(500).json({ message: err });
    }
  };
  module.exports.deleteUser = async (req, res) => {
    try {
      const user = await userModel.findOneAndRemove({ _id: req.params.id }).exec();
  
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
      }
  
      res.status(200).json({ message: "Supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  module.exports.follow = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      const targetUser = await userModel.findById(req.body.idToFollow);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur cible non trouvé" });
      }
  
      // Les utilisateurs existent dans la base de données, procéder à l'opération de suivi
  
      user.following.push(req.body.idToFollow);
      targetUser.followers.push(req.params.id);
  
      await user.save();
      await targetUser.save();
  
      res.status(201).json({ user, targetUser });
    } catch (err) {
      res.status(500).json({ message: err });
      console.log("ici");
    }
  };
  module.exports.unfollow = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      const targetUser = await userModel.findById(req.body.idToUnfollow);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur cible non trouvé" });
      }
  
      // Vérifier si l'utilisateur suit déjà la cible
      if (!user.following.includes(req.body.idToUnfollow)) {
        return res.status(400).json({ message: "Vous ne suivez pas déjà cet utilisateur" });
      }
  
      // Retirer l'utilisateur cible de la liste des utilisateurs suivis
      user.following = user.following.filter((followedId) => followedId.toString() !== req.body.idToUnfollow);
  
      // Retirer l'utilisateur actuel des followers de l'utilisateur cible
      targetUser.followers = targetUser.followers.filter((followerId) => followerId.toString() !== req.params.id);
  
      await user.save();
      await targetUser.save();
  
      res.status(200).json({ message: "Vous avez cessé de suivre l'utilisateur" });
    } catch (err) {
      res.status(500).json({ message: err });
      console.log("ici");
    }
  };
  
  