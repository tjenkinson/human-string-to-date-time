import { cleanup } from './cleanup';
import { extractDayMonthYear } from './extractors/extract-day-month-year';
import { extractIso } from './extractors/extract-iso';
import { extractTime } from './extractors/extract-time';

export type ParsedDateTime = {
  /**
   * Day into the month, starting at 0
   */
  day: number | null;
  /**
   * Month index, starting at 0
   */
  month: number | null;
  /**
   * Year
   */
  year: number | null;
  /**
   * Day of the week. "Sunday = 0" through to "Saturday = 6"
   */
  dayOfWeek: number | null;
  /**
   * Hour of the day from 0 to 23
   *
   * If the input string used am/pm it will be converted to 24 hour time
   *
   * If the input string used a format that could only represent 12 hours,
   * (e.g "half past 1") then the `wasTwelveHourFormat` will be `true` and
   * this will be < 12
   */
  hour: number | null;
  /**
   * Minute of the hour from 0 to 59
   */
  minute: number | null;
  /**
   * Second of the minute from 0 to 59
   */
  second: number | null;
  /**
   * Millisecond of the second from 0 to 999
   */
  millisecond: number | null;
  /**
   * `true` if the input string used a format that could only represent 12 hours,
   * (e.g "half past 1")
   */
  wasTwelveHourFormat: boolean;
};

/**
 * Takes a UK English formatted string containing parts of a date and/or time and
 * returns an object containing the separate parts. Bits that are unkown are set
 * to `null`.
 */
export function parse(input: string): ParsedDateTime {
  const parsedFromIso = extractIso(input);
  if (parsedFromIso) return cleanup(parsedFromIso);

  const parsed: ParsedDateTime = {
    day: null,
    month: null,
    year: null,
    dayOfWeek: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    wasTwelveHourFormat: false,
  };

  const { day, month, year, dayOfWeek } = extractDayMonthYear(input);
  parsed.day = day;
  parsed.month = month;
  parsed.year = year;
  parsed.dayOfWeek = dayOfWeek;

  const { hour, minute, second, millisecond, wasTwelveHourFormat } =
    extractTime(input);
  parsed.hour = hour;
  parsed.minute = minute;
  parsed.second = second;
  parsed.millisecond = millisecond;
  parsed.wasTwelveHourFormat = wasTwelveHourFormat;

  return cleanup(parsed);
}
