const mongoose = require('mongoose');

const loisirEventSchema = new mongoose.Schema({
 date: {
 type: Date,
 required: true
 },
 heure: {
 type: String,
 required: true
 },
 lieu: {
 type: String,
 required: true
 },
 type: {
 type: String,
 required: true
 },
 activité: {
 type: String,
 required: true
 },
 participations: [{
 type: mongoose.Schema.Types.ObjectId,
 ref: 'user'
 }],
 organisateur:{
 type: mongoose.Schema.Types.ObjectId,
 ref:'user',
 required:true
 },
nombre_participants:{type:Number,
    required: true}
});

module.exports = mongoose.model('loisirEvent', loisirEventSchema);
