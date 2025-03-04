class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }

    async validate(request, response) {
        response.send("Ok")
    }

}

module.exports = new HomeController();
