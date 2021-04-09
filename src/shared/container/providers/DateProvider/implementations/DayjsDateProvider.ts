import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  addTime(
    time: number,
    type?: 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): Date {
    return dayjs()
      .add(time, type || 'hours')
      .toDate()
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  // differenceInHours(start_date: Date, end_date: Date): number {
  //   const start_date_utc = this.convertToUtc(start_date)
  //   const end_date_utc = this.convertToUtc(end_date)

  //   return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  // }

  differenceTime(
    start_date: Date,
    end_date: Date,
    type?: 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): number {
    const start_date_utc = this.convertToUtc(start_date)
    const end_date_utc = this.convertToUtc(end_date)

    return dayjs(end_date_utc).diff(start_date_utc, type || 'hours')
  }
}
