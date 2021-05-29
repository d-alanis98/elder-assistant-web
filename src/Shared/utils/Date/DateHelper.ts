import { DateTime } from 'luxon'

/**
 * @author Damian Alanis Ramirez
 * @version 2.1.1
 * @description Date util class.
 */
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

    /**
     * Method to get the date difference in relative format from an ISO string Date.
     * @param {string} isoDate Date string.
     * @returns 
     */
    static getDateDifferenceFromIsoString = (isoDate: string) => (
        DateTime.fromISO(isoDate)
            .setLocale('es-mx')
            .toRelative()
    );

    /**
     * Method to determine if a given TTL date has already expired.
     * @param {number} dateToCompare Date to compare in milliseconds.
     */
    static isTTLDateExpired = (dateToCompare: number) => {
        const currentDate = new Date();
        return dateToCompare < currentDate.getTime();
    }
}