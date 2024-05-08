import {describe, expect, test} from '@jest/globals';
import Vehicles from './vehicles.js'; 

describe('Vehicles tests', () => {

    describe('findStatus', () => {
        test('returns selling when timestamp is between selling and sold', () => {
            const vehicles = new Vehicles();
            const rows = [
                { 
                  vehicleId: 3, 
                  state: 'sold', 
                  timestamp: '2022-09-12T12:41:41.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'selling',
                  timestamp: '2022-09-11T23:21:38.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'quoted',
                  timestamp: '2022-09-11T09:11:45.000Z'
                }
            ]
            const timestamp = new Date('2022-09-12T12:41:40.00Z');
            const status = vehicles.findStatus(rows, timestamp);

            expect(status).toBe('selling')
        });

        test('returns sold when timestamp is older than sold', () => {
            const vehicles = new Vehicles();
            const rows = [
                { 
                  vehicleId: 3, 
                  state: 'sold', 
                  timestamp: '2022-09-12T12:41:41.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'selling',
                  timestamp: '2022-09-11T23:21:38.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'quoted',
                  timestamp: '2022-09-11T09:11:45.000Z'
                }
            ]
            const timestamp = new Date('2022-09-12T12:41:42.00Z');
            const status = vehicles.findStatus(rows, timestamp);

            expect(status).toBe('sold')
        });

        test('returns quoted when timestamp is between quoted and selling', () => {
            const vehicles = new Vehicles();
            const rows = [
                { 
                  vehicleId: 3, 
                  state: 'sold', 
                  timestamp: '2022-09-12T12:41:41.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'selling',
                  timestamp: '2022-09-11T23:21:38.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'quoted',
                  timestamp: '2022-09-11T09:11:45.000Z'
                }
            ]
            const timestamp = new Date('2022-09-11T12:00:00.00Z');
            const status = vehicles.findStatus(rows, timestamp);

            expect(status).toBe('quoted')
        });

        test('returns undefined when timestamp does not exist in set', () => {
            const vehicles = new Vehicles();
            const rows = [
                { 
                  vehicleId: 3, 
                  state: 'sold', 
                  timestamp: '2022-09-12T12:41:41.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'selling',
                  timestamp: '2022-09-11T23:21:38.000Z'
                },
                {
                  vehicleId: 3,
                  state: 'quoted',
                  timestamp: '2022-09-11T09:11:45.000Z'
                }
            ]
            const timestamp = new Date('2022-09-09T12:00:00.00Z');
            const status = vehicles.findStatus(rows, timestamp);

            expect(status).toBe(undefined)
        });
    });
  });