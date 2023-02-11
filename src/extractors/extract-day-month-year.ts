import { daysOfWeek } from '../maps/days-of-week';
import { monthDays } from '../maps/month-days';
import { months } from '../maps/months';

const tokenRegex = /[^ ]+/g;
const wordRegex = /\w+/g;
const numberRegex = /^\d+$/;
const dateRegex = /^([0-9]{1,2})([-/.])([0-9]{1,2})(?:\2([0-9]{2,4}))?$/;

export function extractDayMonthYear(input: string): {
  dayOfWeek: number | null;
  day: number | null;
  month: number | null;
  year: number | null;
} {
  const inLower = input.toLowerCase();
  const words = [...inLower.matchAll(wordRegex)].map(([match]) => match);
  const tokens = [...inLower.matchAll(tokenRegex)].map(([match]) => match);

  let dayOfWeek: number | null = null;
  let fallbackDay: number | null = null;
  let fallbackMonth: number | null = null;
  for (const word of words) {
    if (dayOfWeek === null) {
      dayOfWeek = daysOfWeek.get(word) ?? null;
    }

    if (fallbackMonth === null) {
      fallbackMonth = months.get(word) ?? null;
    }

    if (fallbackDay === null) {
      fallbackDay = monthDays.get(word) ?? null;
    }
  }

  for (const token of tokens) {
    const matches = dateRegex.exec(token);
    if (matches) {
      return {
        dayOfWeek,
        day: parseInt(matches[1], 10) - 1,
        month: parseInt(matches[3], 10) - 1,
        year: matches[4] ? parseInt(matches[4].padStart(4, '20'), 10) : null,
      };
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const first = words[i];
    const second = words[i + 1];
    const yearStr = words.length > i + 2 ? words[i + 2] : null;

    if (months.has(first) && numberRegex.test(second) && second.length === 4) {
      // if number is 4 characters treat as year, otherwise it may be day
      return {
        dayOfWeek,
        day: null,
        month: months.get(first)!,
        year: parseInt(second, 10),
      };
    }

    let dayStr: string | null = null;
    let monthStr: string | null = null;

    if (
      (numberRegex.test(first) || monthDays.has(first)) &&
      months.has(second)
    ) {
      dayStr = first;
      monthStr = second;
    } else if (
      (numberRegex.test(second) || monthDays.has(second)) &&
      months.has(first)
    ) {
      dayStr = second;
      monthStr = first;
    }

    if (dayStr && monthStr) {
      return {
        dayOfWeek,
        day: monthDays.get(dayStr) ?? parseInt(dayStr, 10) - 1,
        month: months.get(monthStr)!,
        year:
          yearStr &&
          numberRegex.test(yearStr) &&
          yearStr.length >= 2 &&
          yearStr.length <= 4
            ? parseInt(yearStr.padStart(4, '20'), 10)
            : null,
      };
    }
  }

  return { dayOfWeek, day: fallbackDay, month: fallbackMonth, year: null };
}
