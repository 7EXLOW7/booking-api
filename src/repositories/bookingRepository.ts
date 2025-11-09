import { Pool } from 'pg';
import { Booking } from '../types';
import pool from '../config/database';

export class BookingRepository {
  private pool: Pool;

  constructor(dbPool: Pool = pool) {
    this.pool = dbPool;
  }

  async findByEventAndUser(eventId: number, userId: string): Promise<Booking | null> {
    const result = await this.pool.query<Booking>(
      'SELECT id, event_id, user_id, created_at FROM bookings WHERE event_id = $1 AND user_id = $2',
      [eventId, userId]
    );
    return result.rows[0] || null;
  }

  async create(eventId: number, userId: string): Promise<Booking> {
    const result = await this.pool.query<Booking>(
      'INSERT INTO bookings (event_id, user_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id, event_id, user_id, created_at',
      [eventId, userId]
    );
    return result.rows[0];
  }
}

