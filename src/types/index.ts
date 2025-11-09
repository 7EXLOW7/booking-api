export interface Event {
  id: number;
  name: string;
  total_seats: number;
}

export interface Booking {
  id: number;
  event_id: number;
  user_id: string;
  created_at: Date;
}

export interface ReserveBookingRequest {
  event_id: number;
  user_id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BookingWithEvent extends Booking {
  event?: Event;
}

