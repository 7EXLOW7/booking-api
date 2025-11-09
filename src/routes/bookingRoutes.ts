import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { validateReserveBooking, validateRequest } from '../middleware/validator';

const router = Router();
const bookingController = new BookingController();

router.post(
  '/reserve',
  validateReserveBooking,
  validateRequest,
  bookingController.reserve
);

export default router;

