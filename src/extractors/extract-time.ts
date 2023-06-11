import { numbers } from '../maps/numbers';

const timeRegex =
  /\b(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?(?: ?(a\.?m\.?|p\.?m\.?))?\b/;
const timeHourRegex = /(?:^|[^\w:])(\d{1,2}) ?(a\.?m\.?|p\.?m\.?)\b/;
const timeWordsRegex = /\b(quarter|half|\d{1,2}) (past|to) (\d{1,2}|\w+)\b/;
const numberRegex = /^\d+$/;

export function extractTime(input: string): {
  hour: number | null;
  minute: number | null;
  second: number | null;
  millisecond: number | null;
  wasTwelveHourFormat: boolean;
} {
  const inLower = input.toLowerCase();
  const timeParts = timeRegex.exec(inLower);
  if (timeParts) {
    const [_, hStr, mStr, sStr, msStr, tod] = timeParts;
    const hourIn = parseInt(hStr, 10);
    let hour: number | null = null;
    if (!tod || hourIn <= 12) {
      hour = tod?.[0] === 'p' ? hourIn + 12 : hourIn;
    }
    const minute = parseInt(mStr, 10);
    const second = sStr ? parseInt(sStr, 10) : null;
    const millisecond = msStr ? parseInt(msStr, 10) : null;
    return {
      hour,
      minute,
      second,
      millisecond,
      wasTwelveHourFormat: false,
    };
  }

  const timeHourParts = timeHourRegex.exec(inLower);
  if (timeHourParts) {
    const [_, hStr, tod] = timeHourParts;
    const hourIn = parseInt(hStr, 10);
    let hour: number | null = null;
    if (hourIn > 0 && hourIn < 12) {
      hour = tod[0] === 'p' ? hourIn + 12 : hourIn;
    } else if (hourIn === 12) {
      hour = tod[0] === 'p' ? 12 : 0;
    }
    return {
      hour,
      minute: null,
      second: null,
      millisecond: null,
      wasTwelveHourFormat: false,
    };
  }

  const timeWordsParts = timeWordsRegex.exec(inLower);
  if (timeWordsParts) {
    const [_, a, pastTo, hStr] = timeWordsParts;
    let hour = numberRegex.test(hStr) ? parseInt(hStr, 10) : numbers.get(hStr);
    let minute: number | null = null;
    if (hour !== undefined && hour > 0 && hour <= 12) {
      if (pastTo === 'past') {
        hour = hour === 12 ? 0 : hour;
        if (numberRegex.test(a)) {
          minute = parseInt(a, 10);
        } else if (a === 'quarter') {
          minute = 15;
        } else if (a === 'half') {
          minute = 30;
        }
      } else if (pastTo === 'to') {
        hour = hour - 1;
        if (numberRegex.test(a)) {
          minute = 60 - parseInt(a, 10);
        } else if (a === 'quarter') {
          minute = 45;
        }
      }
      return {
        hour,
        minute,
        second: null,
        millisecond: null,
        wasTwelveHourFormat: true,
      };
    }
  }
  return {
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    wasTwelveHourFormat: false,
  };
}
