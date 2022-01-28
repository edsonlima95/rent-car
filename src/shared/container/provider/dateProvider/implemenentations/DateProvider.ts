import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import { IDateProvider } from "../IDateProvider";

class DateProvider implements IDateProvider {


    compareInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days")
    }

    compareInHours(start_date: Date, end_date: Date): number {

        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours")
    }

    compareBefore(start_date: Date, end_date: Date):boolean{
        return dayjs(start_date).isBefore(end_date)
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format()
    }

    dateNow(): Date {
        return dayjs().toDate()
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate()
    }
    
    addHours(hour: number): Date {
        return dayjs().add(hour, "hour").toDate()
    }
}


export { DateProvider }