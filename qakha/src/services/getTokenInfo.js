import jwt_decode from "jwt-decode";
const userInformation = {
    
    getUserName(token) {
        var decode = jwt_decode(token);
        return decode.user_name;
    }
}

export default userInformation;