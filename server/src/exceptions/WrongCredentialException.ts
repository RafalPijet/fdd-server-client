import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
    constructor(key: 'hasło' | 'adres email') {
        super(401, `Błąd - niepoprawn${key === 'hasło' ? 'e' : 'y'} ${key}!`);
    }
}

export default WrongCredentialsException;