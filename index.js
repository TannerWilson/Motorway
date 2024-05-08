import express from 'express';
import VehicleService from './vehicleService.js';

function start(port) {
    const vService = new VehicleService();
    const app = express();
    app.use(express.json()); // for parsing application/json

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    app.get("/vehicle/:id", async (req, res) => {
        try {
            const vehicles = await vService.getVehicle(req.params.id, req.query.timestamp)
            res.json(vehicles);
        } catch(e) {
            // Different error codes should be obviscated here
            res.errored(e);
        }
    });
}

if(process.argv[2] && !isNaN(process.argv[2])) {
    const port = process.argv[2]
    start(port);
} else {
    console.log("Please provide a port number. EX: node index.js 3000");
}