const clarifai  = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b63ef1a789684935aa679c575fa457c4'
   });


handleClarifai = (req,res) =>{
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).send("error"));
}

entryCount = (req, res, db) =>{
    const {id} = req.body;
    
    
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries))

    
}

module.exports = {
    entryCount,
    handleClarifai
}