const model = require('../model/createcity');


const addCityController={
    async addCity(req,res){
        const name = req.body.name

        try {
           const data= await model.createCity(name);
            return res.json({"result":data})
        } catch (error) {
           return res.json({"error":error}) ;
        }


    }
}
module.exports = addCityController;