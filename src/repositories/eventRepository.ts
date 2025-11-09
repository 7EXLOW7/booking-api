import { Pool } from 'pg';
import { Event } from '../types';
import pool from '../config/database';

export class EventRepository {
  private pool: Pool;

  constructor(dbPool: Pool = pool) {
    this.pool = dbPool;
  }

  async findById(id: number): Promise<Event | null> {
    const result = await this.pool.query<Event>(
      'SELECT id, name, total_seats FROM events WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async countBookings(eventId: number): Promise<number> {
    const result = await this.pool.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM bookings WHERE event_id = $1',
      [eventId]
    );
    return parseInt(result.rows[0].count, 10);
  }
}

