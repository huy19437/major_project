import jwt_decode from "jwt-decode";
const userInformation = {

    getUser(token) {
        if (token) {
            var decode = jwt_decode(token);
            return decode.user;
        }
        return "";
    }
}

export default userInformation;