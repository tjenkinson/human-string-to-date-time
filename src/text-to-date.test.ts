import { parse, ParsedDate } from './text-to-date';

function fillNulls({
  day,
  month,
  year,
  dayOfWeek,
  hour,
  minute,
  second,
  timeOfDay,
}: Partial<ParsedDate>): ParsedDate {
  return {
    day: day ?? null,
    month: month ?? null,
    year: year ?? null,
    dayOfWeek: dayOfWeek ?? null,
    hour: hour ?? null,
    minute: minute ?? null,
    second: second ?? null,
    timeOfDay: timeOfDay ?? null,
  };
}

describe(`text-to-date`, () => {
  (
    [
      ['', fillNulls({})],
      ['1st December', fillNulls({ day: 1, month: 12 })],
      ['December 1st', fillNulls({ day: 1, month: 12 })],
      ['1 December', fillNulls({ day: 1, month: 12 })],
      ['December 1', fillNulls({ day: 1, month: 12 })],
      ['1st Dec', fillNulls({ day: 1, month: 12 })],
      ['1st Dec', fillNulls({ day: 1, month: 12 })],
      ['Dec 1st', fillNulls({ day: 1, month: 12 })],
      ['01/12', fillNulls({ day: 1, month: 12 })],
      ['01-12', fillNulls({ day: 1, month: 12 })],
      ['1st December 2023', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['December 1 2023', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['December 1 23', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['01/12/2023', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['01/12/23', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['01-12-23', fillNulls({ day: 1, month: 12, year: 2023 })],
      ['1:12', fillNulls({ hour: 1, minute: 12 })],
      // ['1:12 am', fillNulls({ hour: 1, minute: 12, timeOfDay: 'am' })],
      // ['1:12pm', fillNulls({ hour: 1, minute: 12, timeOfDay: 'pm' })],
      // ['2pm', fillNulls({ hour: 2, timeOfDay: 'pm' })],
      // ['1:12:05', fillNulls({ hour: 1, minute: 12, second: 5 })],
      // ['10 past 12', fillNulls({ hour: 12, minute: 10 })],
      // ['quarter to 3', fillNulls({ hour: 2, minute: 45 })],
      // ['quarter past 3', fillNulls({ hour: 3, minute: 15 })],
      // ['half past 3', fillNulls({ hour: 3, minute: 30 })],
      // ['wedneday', fillNulls({ dayOfWeek: 2 })],
      // ['wed', fillNulls({ dayOfWeek: 2 })],
    ] as const
  ).map(([input, expected]) => {
    it(`works with "${input}"`, () => {
      expect(parse(input)).toStrictEqual(expected);
    });
  });
});
