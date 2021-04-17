export function validIdCard(value) {
    return (/^\d{9}$/.test(value)) ? true : false;
}