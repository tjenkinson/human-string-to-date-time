import type { ParsedDateTime } from './human-string-to-date-time';

function getDaysInMonth(month: number | null, year: number | null): number {
  if (month === 1) {
    return year !== null && year % 4 === 0 ? 29 : 28;
  }

  if (month !== null && [3, 5, 8, 10].includes(month)) return 30;

  return 31;
}

export function cleanup(parsed: ParsedDateTime): ParsedDateTime {
  let year: number | null = null;
  if (parsed.year !== null && parsed.year >= 0) {
    year = parsed.year;
  }

  let month: number | null = null;
  if (parsed.month !== null && parsed.month >= 0 && parsed.month < 12) {
    month = parsed.month;
  }

  let day: number | null = null;
  if (
    parsed.day !== null &&
    parsed.day >= 0 &&
    parsed.day < getDaysInMonth(month, year)
  ) {
    day = parsed.day;
  }

  let dayOfWeek: number | null = null;
  if (
    parsed.dayOfWeek !== null &&
    parsed.dayOfWeek >= 0 &&
    parsed.dayOfWeek < 7
  ) {
    dayOfWeek = parsed.dayOfWeek;
  }

  if (day !== null && month !== null && year !== null) {
    const d = new Date();
    d.setFullYear(year, month, day + 1);
    // either fix it if it was wrong, or set it
    dayOfWeek = d.getDay();
  }

  const wasTwelveHourFormat = parsed.wasTwelveHourFormat;

  let hour: number | null = null;
  if (
    parsed.hour !== null &&
    parsed.hour >= 0 &&
    parsed.hour < (wasTwelveHourFormat ? 12 : 24)
  ) {
    hour = parsed.hour;
  }

  let minute: number | null = null;
  if (parsed.minute !== null && parsed.minute >= 0 && parsed.minute < 60) {
    minute = parsed.minute;
  }

  let second: number | null = null;
  if (parsed.second !== null && parsed.second >= 0 && parsed.second < 60) {
    second = parsed.second;
  }

  let millisecond: number | null = null;
  if (
    parsed.millisecond !== null &&
    parsed.millisecond >= 0 &&
    parsed.millisecond < 1000
  ) {
    millisecond = parsed.millisecond;
  }

  return {
    dayOfWeek,
    day,
    month,
    year,
    hour,
    minute,
    second,
    millisecond,
    wasTwelveHourFormat,
  };
}
