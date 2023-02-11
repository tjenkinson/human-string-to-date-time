// TODO make smart so that hour required if minute there?
export type ParsedDate = {
  day: number | null;
  month: number | null;
  year: number | null;
  dayOfWeek: number | null;
  hour: number | null;
  minute: number | null;
  second: number | null;
  millisecond: number | null;
  timeOfDay: `am` | `pm` | null;
};

const months: Map<string, number> = new Map([
  ['january', 1],
  ['jan', 1],
  ['february', 2],
  ['feb', 2],
  ['march', 3],
  ['mar', 3],
  ['april', 4],
  ['apr', 4],
  ['apr', 4],
  ['may', 5],
  ['june', 6],
  ['jun', 6],
  ['july', 7],
  ['jul', 7],
  ['august', 8],
  ['aug', 8],
  ['september', 9],
  ['sept', 9],
  ['sep', 9],
  ['october', 10],
  ['oct', 10],
  ['november', 11],
  ['nov', 11],
  ['december', 12],
  ['dec', 12],
]);

const monthDays: Map<string, number> = new Map([
  ['1st', 1],
  ['2nd', 2],
  ['3rd', 3],
  ['4th', 4],
  ['5th', 5],
  ['6th', 6],
  ['7th', 7],
  ['8th', 8],
  ['9th', 9],
  ['10th', 10],
  ['11th', 11],
  ['12th', 12],
  ['13th', 13],
  ['14th', 14],
  ['15th', 15],
  ['16th', 16],
  ['17th', 17],
  ['18th', 18],
  ['19th', 19],
  ['20th', 20],
  ['21st', 21],
  ['22nd', 22],
  ['23rd', 23],
  ['24th', 24],
  ['25th', 25],
  ['26th', 26],
  ['27th', 27],
  ['28th', 28],
  ['29th', 29],
  ['30th', 30],
  ['31st', 31],
]);

const numbers: Map<string, number> = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['ten', 10],
  ['eleven', 11],
  ['twelve', 12],
]);

const daysOfWeek: Map<string, number> = new Map([
  ['sunday', 0],
  ['sun', 0],
  ['monday', 1],
  ['mon', 1],
  ['tuesday', 2],
  ['tue', 2],
  ['wednesday', 3],
  ['wed', 3],
  ['thursday', 4],
  ['thu', 4],
  ['friday', 5],
  ['fri', 5],
  ['saturday', 6],
  ['sat', 6],
]);

const wordRegex = /\w+/g;
const tokenRegex = /[^ ]+/g;
const numberRegex = /^\d+/;
const dateRegex = /^([0-9]{1,2})([-/])([0-9]{1,2})(?:\2([0-9]{2,4}))?$/;
const timeRegex =
  /\b(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?(?: ?(am|pm))?\b/;
const timeRegexHour = /(?:^|[^\w:])(\d{1,2}) ?(am|pm)\b/;
const timeRegexWords = /\b(quarter|half|\d{1,2}) (past|to) (\d{1,2}|\w+)\b/;
// 2023-02-11T12:10:58.061Z
const isoTimeRegex =
  /\b(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z\b/;

export function parse(input: string): ParsedDate {
  const parsed: ParsedDate = {
    day: null,
    month: null,
    year: null,
    dayOfWeek: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timeOfDay: null,
  };

  const inLower = input.toLowerCase();
  const words = [...inLower.matchAll(wordRegex)].map(([match]) => match);
  const tokens = [...inLower.matchAll(tokenRegex)].map(([match]) => match);

  // TODO scan and don't use hardcoded num
  if (tokens[0]) {
    const matches = dateRegex.exec(tokens[0]);
    if (matches) {
      parsed.day = parseInt(matches[1], 10);
      parsed.month = parseInt(matches[3], 10);
      if (matches[4]) {
        parsed.year = parseInt(matches[4].padStart(4, `20`), 10);
      }
    }
  }

  if (
    words[0] &&
    numberRegex.test(words[0]) &&
    words[1] &&
    months.has(words[1])
  ) {
    parsed.day = parseInt(words[0], 10);
    if (words[2] && numberRegex.test(words[2])) {
      parsed.year = parseInt(words[2].padStart(4, `20`), 10);
    }
  }

  // TODO similar to above
  if (
    words[0] &&
    months.has(words[0]) &&
    words[1] &&
    numberRegex.test(words[1])
  ) {
    parsed.day = parseInt(words[1], 10);
    if (words[2] && numberRegex.test(words[2])) {
      parsed.year = parseInt(words[2].padStart(4, `20`), 10);
    }
  }

  for (const word of words) {
    const month = months.get(word);
    if (month !== undefined) parsed.month = month;

    const monthDay = monthDays.get(word);
    if (monthDay !== undefined) parsed.day = monthDay;

    const dayOfWeek = daysOfWeek.get(word);
    if (dayOfWeek !== undefined) parsed.dayOfWeek = dayOfWeek;
  }

  const timeParts = timeRegex.exec(inLower);
  if (timeParts) {
    const [_, hStr, mStr, sStr, msStr, tod] = timeParts;
    // TODO invalid if out of range
    parsed.hour = parseInt(hStr, 10);
    parsed.minute = parseInt(mStr, 10);
    if (sStr) {
      parsed.second = parseInt(sStr, 10);
    }
    if (msStr) {
      parsed.millisecond = parseInt(msStr, 10);
    }
    if (tod) {
      parsed.timeOfDay = tod === 'am' ? 'am' : 'pm';
    }
  }

  const timePartsHour = timeRegexHour.exec(inLower);
  if (timePartsHour) {
    const [_, hStr, tod] = timePartsHour;
    // TODO invalid if out of range
    parsed.hour = parseInt(hStr, 10);
    parsed.timeOfDay = tod === 'am' ? 'am' : 'pm';
  }

  const timePartsWords = timeRegexWords.exec(inLower);
  if (timePartsWords) {
    const [_, a, pastTo, hStr] = timePartsWords;
    const hour = numberRegex.test(hStr)
      ? parseInt(hStr, 10)
      : numbers.get(hStr);
    if (hour !== undefined) {
      if (pastTo === 'past') {
        parsed.hour = hour;
        if (numberRegex.test(a)) {
          parsed.minute = parseInt(a, 10);
        } else if (a === `quarter`) {
          parsed.minute = 15;
        } else if (a === `half`) {
          parsed.minute = 30;
        }
      } else if (pastTo === 'to') {
        parsed.hour = (hour - 1 + 12) % 12;
        if (numberRegex.test(a)) {
          parsed.minute = 60 - parseInt(a, 10);
        } else if (a === `quarter`) {
          parsed.minute = 45;
        }
      }
    }
  }

  const isoParts = isoTimeRegex.exec(input);
  if (isoParts) {
    const [_, yearStr, monthStr, dayStr, hStr, mStr, sStr, msStr] = isoParts;
    parsed.year = parseInt(yearStr, 10);
    parsed.month = parseInt(monthStr, 10);
    parsed.day = parseInt(dayStr, 10);
    parsed.hour = parseInt(hStr, 10);
    parsed.minute = parseInt(mStr, 10);
    parsed.second = parseInt(sStr, 10);
    parsed.millisecond = parseInt(msStr, 10);
  }

  return parsed;
}
