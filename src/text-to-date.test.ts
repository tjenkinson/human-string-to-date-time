import { parse, ParsedDate } from './text-to-date';

function fillNulls({
  day,
  month,
  year,
  dayOfWeek,
  hour,
  minute,
  second,
  millisecond,
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
    millisecond: millisecond ?? null,
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
      ['1:12 am', fillNulls({ hour: 1, minute: 12, timeOfDay: 'am' })],
      ['1:12pm', fillNulls({ hour: 1, minute: 12, timeOfDay: 'pm' })],
      ['2pm', fillNulls({ hour: 2, timeOfDay: 'pm' })],
      ['1:12:05', fillNulls({ hour: 1, minute: 12, second: 5 })],
      [
        '1:12:05.01',
        fillNulls({ hour: 1, minute: 12, second: 5, millisecond: 1 }),
      ],
      ['10 past 12', fillNulls({ hour: 12, minute: 10 })],
      ['quarter to 3', fillNulls({ hour: 2, minute: 45 })],
      ['quarter past 3', fillNulls({ hour: 3, minute: 15 })],
      ['half past 3', fillNulls({ hour: 3, minute: 30 })],
      ['10 past twelve', fillNulls({ hour: 12, minute: 10 })],
      ['10 to twelve', fillNulls({ hour: 11, minute: 50 })],
      ['sunday', fillNulls({ dayOfWeek: 0 })],
      ['wednesday', fillNulls({ dayOfWeek: 3 })],
      ['wed', fillNulls({ dayOfWeek: 3 })],
      [
        '12th November 1995 at 12:13:02',
        fillNulls({
          day: 12,
          month: 11,
          hour: 12,
          minute: 13,
          second: 2,
          year: 1995,
        }),
      ],
      // ['2023-02-11T12:10:58.061Z', fillNulls({})],
    ] as const
  ).map(([input, expected]) => {
    it(`works with "${input}"`, () => {
      expect(parse(input)).toStrictEqual(expected);
    });
  });
});
