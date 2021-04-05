import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  differenceInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUtc(start_date)
    const end_date_utc = this.convertToUtc(end_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  dateNow(): Date {
    return dayjs().toDate()
  }
}
