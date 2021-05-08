export function validPassword(value) {
    return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,128}$/.test(value)) ? true : false;
}