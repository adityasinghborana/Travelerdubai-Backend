const createTourtypes = require('../model/tourtypes');

const createTourTypeController = {
    async tourtype(req, res) {

        const typename = req.body.name
        try {
            const data = await createTourtypes.saveTourType(typename); // Ensure the function name matches
            return res.json({ result: data });
        } catch (error) {
            console.error("Error creating tour type:", error);
            return res.status(500).json({ 'error message': 'An error occurred while creating the tour type' });
        }
    }
};

module.exports = createTourTypeController;
