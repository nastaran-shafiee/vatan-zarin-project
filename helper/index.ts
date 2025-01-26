import { format } from 'date-fns';
import moment from 'jalali-moment';

export const assets = (path: string) => {
  return process.env.app_url + path;
};

export const nowUntilXMonthsAgo = (x?: number) => {
  return {
    FromDate: new Date(new Date().setMonth(new Date().getMonth() - (x || 2))),
    ToDate: new Date(),
  };
};

export const nowUntilXMonthsLater = (x?: number) => {
  return {
    FromDate: new Date(),
    ToDate: new Date(new Date().setMonth(new Date().getMonth() + (x || 2))),
  };
};

export const jalaliToGregorianDateConvertor = ({
  date
}: {
  date: string;
}) => {
  return date;
};

export const getIpAddress = () => {
  return fetch('https://api.ipify.org?format=json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.ip;
    })
    .catch(function (error) {
      throw error;
    });
};

export const intToMoney = (money: number) => {
  return new Intl.NumberFormat().format(money);
};
export const DateConvertor = (date: string | number | Date) => {
  let timestamp: any;
  if (typeof date === 'string') {
    timestamp = Date.parse(date);
  } else {
    timestamp = date;
  }
  const inputDate: Date = new Date(timestamp);
  const formattedDate: string = format(inputDate, 'yyyy/MM/dd');
  return formattedDate;
};

export function convertKeysToPascalCase<T>(obj: T): T {
  const convertedObj = {} as T;

  for (let key in obj) {
    if ((obj as Object).hasOwnProperty(key)) {
      const pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      convertedObj[pascalCaseKey as keyof T] = obj[key];
    }
  }

  return convertedObj;
}

export function htmlToText(html: string) {
  let temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}

export function jalaliToGregorian(jalaliDate: string) {
  let m = moment.from(jalaliDate, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'); // 1989-01-24
  return m;
}
export function gregorianToJalali(gregorianDate: string) {
  return moment(gregorianDate, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'); // 1367/11/04
}
export function jalaliToGregorianTimeStamp(jalaliDateTime: string) {
  let m = moment
    .from(jalaliDateTime, 'fa', 'YYYY/MM/DD HH:mm:ss ')
    .format('YYYY-MM-DD HH:mm:ss'); // 1989-01-24
  return m;
}
export function dateString2Date(dateString: string) {
  let timestamp = new Date(dateString);
  return timestamp.getTime();
}
