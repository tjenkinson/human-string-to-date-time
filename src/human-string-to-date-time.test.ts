import { parse, ParsedDateTime } from './human-string-to-date-time';

function fill({
  day,
  month,
  year,
  dayOfWeek,
  hour,
  minute,
  second,
  millisecond,
  wasTwelveHourFormat,
}: Partial<ParsedDateTime>): ParsedDateTime {
  return {
    day: day ?? null,
    month: month ?? null,
    year: year ?? null,
    dayOfWeek: dayOfWeek ?? null,
    hour: hour ?? null,
    minute: minute ?? null,
    second: second ?? null,
    millisecond: millisecond ?? null,
    wasTwelveHourFormat: wasTwelveHourFormat ?? false,
  };
}

describe('human-string-to-date-time', () => {
  (
    [
      ['', fill({})],
      ['1st', fill({ day: 0 })],
      ['1st December', fill({ day: 0, month: 11 })],
      ['December 1st', fill({ day: 0, month: 11 })],
      ['1 December', fill({ day: 0, month: 11 })],
      ['December 1', fill({ day: 0, month: 11 })],
      ['1st Dec', fill({ day: 0, month: 11 })],
      ['1st Dec', fill({ day: 0, month: 11 })],
      ['Dec 1st', fill({ day: 0, month: 11 })],
      ['01/12', fill({ day: 0, month: 11 })],
      ['01-12', fill({ day: 0, month: 11 })],
      [
        '1st December 2023',
        fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 }),
      ],
      [
        '1st December, 2023',
        fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 }),
      ],
      [
        'December 1 2023',
        fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 }),
      ],
      ['December 1 23', fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 })],
      ['01/12/2023', fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 })],
      ['01/12/23', fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 })],
      ['01/12-23', fill({})],
      ['01-12-23', fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 })],
      ['01.12.23', fill({ day: 0, month: 11, year: 2023, dayOfWeek: 5 })],
      ['00-00-00', fill({ year: 2000 })],
      ['00-00-100', fill({ year: 2100 })],
      ['32-01-23', fill({ month: 0, year: 2023 })],
      ['29-02-0004', fill({ day: 28, month: 1, year: 4, dayOfWeek: 0 })],
      ['29-02-0005', fill({ month: 1, year: 5 })],
      ['1:12', fill({ hour: 1, minute: 12 })],
      ['1:12 am', fill({ hour: 1, minute: 12 })],
      ['1:12pm', fill({ hour: 13, minute: 12 })],
      ['1:12p.m.', fill({ hour: 13, minute: 12 })],
      ['2am', fill({ hour: 2 })],
      ['2pm', fill({ hour: 14 })],
      ['2p.m.', fill({ hour: 14 })],
      ['13am', fill({})],
      ['13pm', fill({})],
      ['11:00', fill({ hour: 11, minute: 0 })],
      ['12:00', fill({ hour: 12, minute: 0 })],
      ['13:00', fill({ hour: 13, minute: 0 })],
      ['13:00am', fill({ minute: 0 })],
      ['13:00pm', fill({ minute: 0 })],
      ['00:00', fill({ hour: 0, minute: 0 })],
      ['23:59', fill({ hour: 23, minute: 59 })],
      ['24:00', fill({ minute: 0 })],
      ['00:60', fill({ hour: 0 })],
      ['1:12:05', fill({ hour: 1, minute: 12, second: 5 })],
      ['1:12:05.01', fill({ hour: 1, minute: 12, second: 5, millisecond: 1 })],
      ['1:12:05.000', fill({ hour: 1, minute: 12, second: 5, millisecond: 0 })],
      [
        '1:12:05.999',
        fill({ hour: 1, minute: 12, second: 5, millisecond: 999 }),
      ],
      ['1:12:05.1000', fill({ hour: 1, minute: 12, second: 5 })],
      ['10 past 12', fill({ hour: 0, minute: 10, wasTwelveHourFormat: true })],
      [
        'quarter to 3',
        fill({ hour: 2, minute: 45, wasTwelveHourFormat: true }),
      ],
      [
        'quarter past 3',
        fill({ hour: 3, minute: 15, wasTwelveHourFormat: true }),
      ],
      ['half past 3', fill({ hour: 3, minute: 30, wasTwelveHourFormat: true })],
      [
        '10 past twelve',
        fill({ hour: 0, minute: 10, wasTwelveHourFormat: true }),
      ],
      [
        '10 to twelve',
        fill({ hour: 11, minute: 50, wasTwelveHourFormat: true }),
      ],
      ['sunday', fill({ dayOfWeek: 0 })],
      ['wednesday', fill({ dayOfWeek: 3 })],
      ['wed', fill({ dayOfWeek: 3 })],
      ['11 Feb 2023', fill({ day: 10, month: 1, year: 2023, dayOfWeek: 6 })],
      ['Feb 11', fill({ day: 10, month: 1 })],
      ['Feb 23', fill({ day: 22, month: 1 })],
      ['Feb 40', fill({ month: 1 })],
      ['Feb 2023', fill({ month: 1, year: 2023 })],
      ['11th Feb 2023', fill({ day: 10, month: 1, year: 2023, dayOfWeek: 6 })],
      ['11th Feb 103', fill({ day: 10, month: 1, year: 2103, dayOfWeek: 0 })],
      ['11th Feb 23', fill({ day: 10, month: 1, year: 2023, dayOfWeek: 6 })],
      ['11th Feb 2', fill({ day: 10, month: 1 })],
      ['11th Feb 3000', fill({ day: 10, month: 1, year: 3000, dayOfWeek: 2 })],
      [
        'Sat 11 Feb 2023',
        fill({ day: 10, month: 1, year: 2023, dayOfWeek: 6 }),
      ],
      [
        'Mon 11 Feb 2023',
        fill({ day: 10, month: 1, year: 2023, dayOfWeek: 6 }),
      ],
      [
        '12th November 1995 at 12:13:02',
        fill({
          dayOfWeek: 0,
          day: 11,
          month: 10,
          hour: 12,
          minute: 13,
          second: 2,
          year: 1995,
        }),
      ],
      [
        '12th November 1995 at quarter past 2',
        fill({
          dayOfWeek: 0,
          day: 11,
          month: 10,
          hour: 2,
          minute: 15,
          year: 1995,
          wasTwelveHourFormat: true,
        }),
      ],
      [
        '2023-02-11T12:10:58.061Z',
        fill({
          dayOfWeek: 6,
          day: 10,
          month: 1,
          year: 2023,
          hour: 12,
          minute: 10,
          second: 58,
          millisecond: 61,
        }),
      ],
    ] as const
  ).map(([input, expected]) => {
    it(`works with "${input}"`, () => {
      expect(parse(input)).toStrictEqual(expected);
    });
  });
});
