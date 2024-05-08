import pg from 'pg'
import config from './dbConfig.js'


export default class Vehicles {

    async connect() {
        const { Client } = pg
        const client = new Client(config)

        try {
            await client.connect()
        } catch (e) {
            throw new Error(`Unable to connect to database.\n`, e)
        }
        return client;
    }

    async getVehicleInformation(id, timestamp) {
        try {
            const client = await this.connect();

            const vehicle = await this.getVehicleById(id, client);
            const status = await this.getStatusById(id, client);

            const newState = this.findStatus(status, timestamp);

            // Only update if we find a new state
            if(newState) {
                vehicle.state = newState;
            }

            await client.end();
            return vehicle;
        } catch (err) {
            console.error(err);
            throw new Error(err);
        } 
    }

    /**
     * With the rows ordered descending by timestamp, the first timestamp from the db that 
     * the input timestamp (from the user) is greater than will be the correct status we 
     * want to display
     * @param {*} rows 
     * @param {*} timestamp 
     * @returns 
     */
    findStatus(rows, timestamp) {
        for(const row of rows) {
            if(timestamp.getTime() >= new Date(row.timestamp).getTime()) {
                return row.state;
            }
        }
    }

    async getVehicleById(id, client) {
        const vehicle = await client.query(`SELECT * FROM vehicles WHERE id=${id}`);
        return vehicle.rows[0];
    }

    async getStatusById(id, client) {
        const status = await client.query(`SELECT * FROM "stateLogs" WHERE "vehicleId"=${id} ORDER BY timestamp DESC`);
        return status.rows;
    }
}