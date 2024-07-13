const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const addCity ={

    async createCity (name){
try {
const data = await prisma.City.create({data:{
    CityName:name
}});
return data;

}
catch(e){
    console.log (e);
}
    }
};
module.exports = addCity;

