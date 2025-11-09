import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('events', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    total_seats: {
      type: 'integer',
      notNull: true,
    },
  });

  pgm.createTable('bookings', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    event_id: {
      type: 'integer',
      notNull: true,
      references: 'events(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'varchar',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('bookings', ['event_id', 'user_id'], {
    unique: true,
    name: 'bookings_event_user_unique',
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('bookings');
  pgm.dropTable('events');
}

