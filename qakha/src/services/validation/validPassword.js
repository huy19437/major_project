export function validPassword(value) {
    return (/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,70}$/.test(value)) ? true : false;
}