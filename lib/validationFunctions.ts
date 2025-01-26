import { DateConvertor } from '#/helper';
import { format } from 'date-fns';

export function isValidIranianNationalCode(input: string): boolean {
  if (!/^\d{10}$/.test(input)) return false;
  const check = +input[9];
  const sum =
    input
      .split('')
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}
export function isValidBrithDate(input: string): boolean {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const formattedDate = format(eighteenYearsAgo, 'yyyy-MM-dd');
  return DateConvertor(input) < formattedDate;
}
export function isValidLength(input: number) {
  return input.toString().length === 16;
}
export function validatePhoneNumber(phoneNumber?: string | null) {
  const phoneRegex = /^[0-9]{11}$/;
  if (phoneNumber) {
    return phoneRegex.test(phoneNumber);
  } else {
    return true;
  }
}

export function checkShiftId(shiftId?: number) {
  if (shiftId === 0) {
    return false;
  } else {
    return true;
  }
}
