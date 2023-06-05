const userModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectID

module.exports.getAllUsers = async (req , res) =>{
    const users = await userModel.find().select("-password");
    res.status(200).json(users)
}

// module.exports.infoUser = async (req,res) =>{
//     console.log(req.params);
//     if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send('ID unknown'+ req.params.id)
//     userModel.findById (req.params.id ,(err,docs) => {
//         if (!err) res.send (docs);
//         else    console.log('ID unknown:'+ err);
//     }).select('-password')
//     //const user = await userModel.
// }
module.exports.infoUser = async (req,res) =>{
    try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) return res.status(400).send('ID unknown'+ req.params.id);
    res.send(user);
    } catch (err) {
    console.log('ID unknown:'+ err);
    }
   }
   module.exports.updateUser = async (req, res) => {
    try {
      const user = await userModel.findOneAndUpdate(
        { _id: req.params.id },
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
  