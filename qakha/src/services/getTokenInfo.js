const userInformation = {
    getUserName(token) {
        try {
            return JSON.parse(atob(token.split('.')[1])).user_name;
        } catch (e) {
            return null;
        }

    }
}

export default userInformation;