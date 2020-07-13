import {  Request, Response } from 'express';
import fs from 'fs';
import { parseISO, format, addDays, addWeeks } from 'date-fns';
const data =  require('../../data.json');
import { pt } from 'date-fns/locale';


interface Appointments {
    id: string;
    day: string;
    duration: string[];
    intervals: Interval[];
}

interface Interval {
    intervals: Interval;
    start: string;
    end: string;
}
// interface Content {
//     appointments: Appointments[];
// }

class AppointmentController {
    async store(request: Request, response: Response) {

        // METODO POST
        // http://localhost:3333/appointment
        //
        // request.body
        //{
        //     "day": "2020-04-06",
        //     "intervals":
        //     [
        //         {
        //             "start": "11:10",
        //             "end": "12:00"
        //         },
        //         {
        //             "start": "08:00",
        //             "end": "09:05"
        //         }
        //     ]
        // }

        const { day, intervals }  = request.body;

        const intervalTime = intervals.map((interval: Interval)  => ({
            start: interval.start,
            end: interval.end
        }));

        const specificDay = parseISO(day);

        const formattedDate = format(
            specificDay, "dd-MM-yyyy", { locale: pt }
        );

        const appointment = {
            id: String('specificDay'),
            day: formattedDate,
            intervals: intervalTime
        };

        const findAppointmentInSameDay = data.appointments.find((item: Appointments) => item.day === appointment.day);

        if (findAppointmentInSameDay) {

            const findAppointmentDaily = data.appointments.find((item: Appointments) => {
                return String(item.intervals?.map((item: Interval) => [item.start, item.end]))
                ===
                String(appointment.intervals?.map((item: Interval) => [item.start, item.end]));
              });

              if (findAppointmentDaily) {
                return response.status(400).json({ error: 'You cannot create appointments in the same day with same intervals.'});
            };

        };

        data.appointments.push(appointment);

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) {
                return response.status(400).json('Invalid write file!');
            }

        });


        return response.json(appointment);
    }

    async storeDaily(request: Request, response: Response) {
        // METODO POST
        // http://localhost:3333/appointment/daily
        //
        // request.body
        // {
        //     "daily": [
        //         {
        //             "segunda": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             },
        //             "terca": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             },
        //             "quarta": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             },
        //             "quinta": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             },
        //             "sexta": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             },
        //             "sabado": {
        //                 "start": "13:00",
        //                 "end": "14:00"
        //             }
        //         }
        //     ]
        // }

        const { duration, daily }  = request.body;

        const dailyAppointment = {
            id: String('daily'),
            duration,
            daily
        };

        const findAppointmentDaily = data.appointments
        .find((item: Appointments) => String(item.duration) === String(dailyAppointment.duration));

        if (findAppointmentDaily) {
            return response.status(400).json({ error: 'You cannot create appointments in the same duration.'});
        };

        data.appointments.push(dailyAppointment);

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) {
                return response.status(400).json('Invalid write file!');
            }

        });

        return response.json(dailyAppointment);
    }

    async storeWeekly(request: Request, response: Response) {
        // METODO POST
        // http://localhost:3333/appointment/weekly
        //
        // request.body
        // {
        // 	"duration": ["11-04-2020", "13-04-2020"],
        // 	"weekly": [
        // {
        // 		"terca": {
        // 			"start": "15:00",
        // 			"end": "16:20"
        // 			},
        // 		"sexta": {
        // 			"start": "15:00",
        // 			"end": "16:20"
        // 		    }
        // 		}
        // 	]
        // }
        const { duration, weekly }  = request.body;

        const weeklyData = {
            id: String('weekly'),
            duration,
            weekly,
        };

        const findAppointmentInSameWeek = data.appointments
        .find((item: Appointments) => String(item.duration) === String(weeklyData.duration));

        if (findAppointmentInSameWeek) {
            return response.status(400).json({ error: 'You cannot create appointments in the same duration.'});
        };

        data.appointments.push(weeklyData);

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) {
                return response.status(400).json('Invalid write file!');
            }

        });

        return response.json(weeklyData);
    }

    async index(request: Request, response: Response) {
        // METODO GET
        // http://localhost:3333/appointments

        const findAllAppointments = data.appointments.find((item: Appointments) => {
            return item
        });

        if (!findAllAppointments) {
            return response.status(400).json({ error: 'No appointments registered'});
        };

        return response.json(data);
    };

    async delete(request: Request, response: Response) {
        // METODO DELETE
        // http://localhost:3333/appointment/specificDay | daily | weekly

        const { id } = request.params;

        const checkAppointmentExists = data.appointments.find((item: Appointments) => {
            return item.id === id
        });
        if (!checkAppointmentExists) {
            return response.status(400).json({ error: 'No appointments to delete.'});
        };


        const filteredAppointmentRule = data.appointments.filter((item: Appointments) => {
            return item.id !== id;
        });


        data.appointments = filteredAppointmentRule;

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) {
                return response.status(400).json('Invalid write file!');
            }

        });

        return response.json();
    };

};



export default new AppointmentController();


