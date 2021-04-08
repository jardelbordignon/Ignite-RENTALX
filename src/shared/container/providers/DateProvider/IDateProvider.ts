export interface IDateProvider {
  convertToUtc(date: Date): string
  dateNow(): Date
  /**
   * @param start_date
   * @param end_date
   * @param time - default is hours
   */
  differenceTime(
    start_date: Date,
    end_date: Date,
    time?: 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): number
}
