const userInformation = {
    getUserName(token) {
        try {
            return JSON.parse(atob(token.split('.')[1])).account_name;
        } catch (e) {
            return null;
        }

    }
}

export default userInformation;