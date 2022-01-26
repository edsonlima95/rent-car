
interface IDateProvider {

    compareInHours(start_date: Date, end_date: Date):number;
    compareInDays(start_date: Date, end_date: Date):number;
    dateNow(): Date;
    convertToUtc(date: Date):string
    addDays(days: number):Date
}

export {IDateProvider}