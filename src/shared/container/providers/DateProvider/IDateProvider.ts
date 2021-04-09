export interface IDateProvider {
  /**
   * @param time - time to add
   * @param type - default is hours
   * @ addTime(3, 'days')
   */
  addTime(
    time: number,
    type?: 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): Date
  convertToUtc(date: Date): string
  dateNow(): Date
  /**
   * @param start_date
   * @param end_date
   * @param type - default is hours
   */
  differenceTime(
    start_date: Date,
    end_date: Date,
    type?: 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): number
}
