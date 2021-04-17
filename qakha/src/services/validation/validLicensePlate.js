export function validLicensePlate(value) {
    return (/^[0-9]{2}[A-Z]{1}[0-9]{1}-[0-9]{5}$/.test(value)) ? true : false;
}