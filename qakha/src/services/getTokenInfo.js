import jwt_decode from "jwt-decode";
const userInformation = {

    getUserName(token) {
        if (token) {
            var decode = jwt_decode(token);
            return decode.user_name;
        }
        return "";
    }
}

export default userInformation;