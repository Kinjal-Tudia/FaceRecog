const handleRegister = (req,res,db,bcrypt) =>{
    const {email, name, password} = req.body; 
    
    if(!email || !name || !password){
        return res.status(400).json("Enter the values");
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx=>{
        return trx.insert({
            email : email, 
            hash : hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return  trx('users')
            .returning('*')
            .insert(
                { 
                    
                    name : name,
                    email : loginEmail[0],
                    entries : 0,
                    joined : new Date()
                }
            ).then(
                user => res.json(user[0])
            )
            .then(trx.commit)
            .catch(trx.rollback);

        })
        .catch(err => res.status(400).json("Email already Exist"))
    })


    
}

module.exports = {
    handleRegister
}