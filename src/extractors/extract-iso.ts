import type { ParsedDateTime } from '../human-string-to-date-time';

// 2023-02-11T12:10:58.061Z
const isoTimeRegex =
  /\b(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z\b/;

export function extractIso(input: string): ParsedDateTime | null {
  const isoTimeParts = isoTimeRegex.exec(input);
  if (isoTimeParts) {
    const [_, yearStr, monthStr, dayStr, hStr, mStr, sStr, msStr] =
      isoTimeParts;
    return {
      year: parseInt(yearStr, 10),
      month: parseInt(monthStr, 10) - 1,
      day: parseInt(dayStr, 10) - 1,
      hour: parseInt(hStr, 10),
      minute: parseInt(mStr, 10),
      second: parseInt(sStr, 10),
      millisecond: parseInt(msStr, 10),
      dayOfWeek: null,
      wasTwelveHourFormat: false,
    };
  }
  return null;
}
