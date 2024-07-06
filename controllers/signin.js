handleSignin = (req,res,db,bcrypt)=>{
    const {email,password} = req.body;
    db.select('*').from('login')
    .where({
        email : email
    })
    .then(user => {
        if(user.length){
            bcrypt.compare(password, user[0].hash, function(err,result){
                if(result){
                    db.select('*')
                    .from('users')
                    .where({
                        email : email
                    })
                    .then(retUser =>{
                        res.json(retUser[0])
                    })
                } 
                
                else res.status(400).json("Password Error");
            })
        }
        else res.status(400).json("Email Error");
    });
   
        
}

module.exports = {
    handleSignin

}