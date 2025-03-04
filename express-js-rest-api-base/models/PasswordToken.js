const { response } = require("express")
var knex = require("../database/connection")
var User = require("./User")

class PasswordToken {
    async create(email) {
        var user = await User.findByEmail(email)
        if(user != undefined) {
            var token = Date.now() 
            try {
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token // recomendado user o UUID (pesquisar node)
                }).table("passwordtokens")
                return {status: true, token: token}
            } catch(err) {
                return {status: false, err: 'Erro ao inserir o token.'}
            }
        } else {
            return {status: false, err: 'Email não existe.'}
        }
    }


    async validate(token) {
        try {
            var result = await knex.select().where({token: token}).table("passwordtokens")
            if(result.length > 0) {
                var tk = result[0]
                if(tk.used) {
                    return {status: false}
                }
                else {
                    return {status: true, token: tk}
                }
            }
            else 
                return {status: false}
        } catch(err) {
            console.log(err)
            return {status: false}
        }
    }


    async setUsed(token) {
        await knex.update({used: 1}).where({token: token}).table("passwordtokens")
    }
}


module.exports = new PasswordToken()
