import Vehicles from './vehicles.js';

export default class VehicleService {
    constructor() {
        this.vehicles = new Vehicles();
    }


    async getVehicle(id, timestamp) {
        await this.vehicles.connect();
        try {
            const res = this.vehicles.getVehicleInformation(id, new Date(timestamp));
            return res;
        } catch (e) {
            throw e;
        } 
    }
}