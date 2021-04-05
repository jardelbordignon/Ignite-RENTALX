export interface IDateProvider {
  convertToUtc(date: Date): string
  differenceInHours(start_date: Date, end_date: Date): number
  dateNow(): Date
}
