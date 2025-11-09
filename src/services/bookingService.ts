import { Booking } from '../types';
import { EventRepository } from '../repositories/eventRepository';
import { BookingRepository } from '../repositories/bookingRepository';

export class BookingService {
  private eventRepository: EventRepository;
  private bookingRepository: BookingRepository;

  constructor(
    eventRepository: EventRepository = new EventRepository(),
    bookingRepository: BookingRepository = new BookingRepository()
  ) {
    this.eventRepository = eventRepository;
    this.bookingRepository = bookingRepository;
  }

  async reserveBooking(eventId: number, userId: string): Promise<Booking> {
    const event = await this.eventRepository.findById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }

    const existingBooking = await this.bookingRepository.findByEventAndUser(eventId, userId);
    
    if (existingBooking) {
      throw new Error('User has already booked this event');
    }

    const bookingsCount = await this.eventRepository.countBookings(eventId);
    
    if (bookingsCount >= event.total_seats) {
      throw new Error('No available seats');
    }

    return await this.bookingRepository.create(eventId, userId);
  }
}

