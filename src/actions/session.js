import { sessionService } from 'redux-react-session';
import * as sessionApi from '../utils/utilsApi';

export const login = (user) => {
    return () => {
        try {

            var val =  sessionApi.login(user);
        } catch (e) {
            console.log(e)
        }
        return sessionApi.login(user).then(response => {
            const { token } = response;
            sessionService.saveSession({ token })
                .then(() => {
                    sessionService.saveUser(response.data)
                });
        });
    };
};

export const logout = () => {
    return () => {
        return sessionApi.logout().then(() => {
            sessionService.deleteSession();
            sessionService.deleteUser();
        }).catch(err => {
            throw (err);
        });
    };
};
