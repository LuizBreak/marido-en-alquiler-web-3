import { DateTime } from 'luxon';

export function chatTimestamp(value) {
  if (DateTime.isDateTime(value)) return value;
  if (value instanceof Date) return DateTime.fromJSDate(value);
  if (typeof value === 'number') return DateTime.fromMillis(value);
  if (typeof value === 'string') {
    const iso = DateTime.fromISO(value);
    return iso.isValid ? iso : DateTime.fromSQL(value, { zone: 'utc' }).toLocal();
  }
  return DateTime.invalid('Missing message time');
}
