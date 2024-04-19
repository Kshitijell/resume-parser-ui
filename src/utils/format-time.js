import { format, getTime, formatDistanceToNow } from 'date-fns';

export function fDateTime(date, newFormat) {
  const fm = newFormat ?? 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}
export function fTime(date, newFormat) {
  const fm = newFormat ?? 'p';

  return date ? format(new Date(date), fm) : '';
}

export const fTimestamp = (date) => (date ? getTime(new Date(date)) : '');

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
