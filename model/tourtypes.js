const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const TourTypeModel = {
    async saveTourType(tourtype) {
        try {
            const savedData = await prisma.Tourtypes.create({
                data: {
                    cityTourType: tourtype
                }
            });
            return savedData;
        } catch (error) {
            console.error("Error saving tour type:", error);
            return { error: "An error occurred while saving the tour type" };
        } finally {
            await prisma.$disconnect();
        }
    }};
module.exports = TourTypeModel;






