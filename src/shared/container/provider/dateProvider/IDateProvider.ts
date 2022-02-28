
interface IDateProvider {

    compareInHours(start_date: Date, end_date: Date):number;
    compareInDays(start_date: Date, end_date: Date):number;
    compareBefore(start_date: Date, end_date: Date):boolean
    dateNow(): Date;
    convertToUtc(date: Date):string
    addDays(days: number):Date
    addHours(hour: number): Date

}

export {IDateProvider}