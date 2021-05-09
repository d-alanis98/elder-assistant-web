import { DateTime } from 'luxon'

export default class DateHelper {
    /**
     * Method to get the relative to calendar string of a given upcoming date.
     * @param {string} upcomingHour String with the upcoming time.
     * @param {number} daysDifference Day difference to the upcoming date.
     * @returns 
     */
    static getDateDifferenceFromNow = (upcomingHour: string, daysDifference: number) => {
        //We get the hour members
        const [hour, minutes] = upcomingHour.split(':');
        //We set the next date and add the days difference
        const nextDate = DateTime.fromObject({
            hour: Number(hour),
            minute: Number(minutes)
        })
            .plus({ days: daysDifference })
            .setLocale('es-mx');
        return nextDate.toRelativeCalendar();

    }

    static getDateDifferenceFromIsoString = (isoDate: string) => (
        DateTime.fromISO(isoDate)
            .setLocale('es-mx')
            .toRelative()
    );
}