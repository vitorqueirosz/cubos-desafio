import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController';
import SchedulleController from '../controllers/SchedulleController';

const routes = Router();

routes.post('/appointment', AppointmentController.store);
routes.post('/appointment/daily', AppointmentController.storeDaily);
routes.post('/appointment/weekly', AppointmentController.storeWeekly);

routes.delete('/appointment/:id', AppointmentController.delete);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', SchedulleController.index);

export default routes;


