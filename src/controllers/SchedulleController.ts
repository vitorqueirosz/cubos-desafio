import {  Request, Response } from 'express';
const data = require( '../../data.json');

interface Interval {
    start: string;
    end: string;
}
interface Appointments {
    id: string;
    day: string;
    intervals: Interval[];
}


class SchedulleController {
    async index(request: Request, response: Response) {
        // METODO GET
        // http://localhost:3333/schedule

        const { date } = request.query;

        const filteredDate = data.appointments.find((item: Appointments) => {
            return item.day === date
        });

        if (!filteredDate) {
            return response.json({ error: 'No appointments registered.'});
        }

        if (filteredDate) {
            const { day, intervals } = filteredDate;

            return response.json({
                day,
                intervals
            });
        }

    };


};



export default new SchedulleController();
