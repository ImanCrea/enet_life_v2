import {add, format} from 'date-fns';
import {TWorkday} from '../lib/type/TWorkday';
import {fr} from 'date-fns/locale';
import {BASEURL_DOC_URI} from '../api/appUrl';
import {AppState} from 'react-native';

export function generateToken(userId: string, username: string) {
    let token = userId + ':' + username;
    const tokenDate = add(new Date(), {days: 100});
    token = token + '-' + tokenDate.getTime().toString();
    return btoa(token);
}

export function checkIsNumber(number: any) {
    if (isNaN(number)) {
        return '0';
    } else {
        return new Intl.NumberFormat('fr-FR').format(Number(number ?? 0));
    }
}

export function formatNumberFr(number: number): string {
    return new Intl.NumberFormat('fr-FR').format(Number(number ?? 0));
}

export function formatNumberOnTwoPad(number: any): string {
    const parseNumber = parseInt(number, 10);
    if (parseNumber < 10) {
        return parseNumber.toString().padStart(2, '0');
    }
    return parseNumber.toString();
}

export function convertWorkdaysToString(data: TWorkday[]): string[] {
    if (data.length > 0) {
        return data.map((workday: TWorkday) => {
            return workday.nomday;
        });
    } else {
        return [];
    }
}

export function formatLongDateFr(date: number | undefined) {
    let completeDate = '';
    if (date !== undefined) {
        const formattedDate = Number.parseInt(date.toString(), 10);
        completeDate =
            format(formattedDate, 'dd', {locale: fr}) +
            ' ' +
            format(formattedDate, 'MMM', {locale: fr}) +
            ' ' +
            format(formattedDate, 'yyyy', {locale: fr});
    }
    return completeDate;
}

export function checkIfDecimalNumber(number: number | null | undefined) {
    if(number === null || number === undefined) {
        return false;
    }
    return number % 1 !== 0;
}

export function generateBulletinLink(uriPlatform: string, uriBulletin: string) {
    return `${uriPlatform}/${BASEURL_DOC_URI}/bulletin/${uriBulletin}`;
}
export const checkAppState = (appState: any, count: number, setCount: any) => {
    return AppState.addEventListener('change', nextAppState => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            setCount(count + 1);
        } else {
            setCount(count + 1);
        }
        appState.current = nextAppState;
    });
};
