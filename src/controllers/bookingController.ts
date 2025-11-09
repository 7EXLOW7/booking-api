import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/bookingService';
import { ReserveBookingRequest, ApiResponse } from '../types';

export class BookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService = new BookingService()) {
    this.bookingService = bookingService;
  }

  reserve = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { event_id, user_id }: ReserveBookingRequest = req.body;
      
      const booking = await this.bookingService.reserveBooking(event_id, user_id);
      
      const response: ApiResponse<typeof booking> = {
        success: true,
        data: booking,
      };
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

