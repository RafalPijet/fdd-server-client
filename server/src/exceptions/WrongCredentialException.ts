import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
    constructor(key: 'hasło' | 'adres email') {
        super(402, `Błąd - niepoprawn${key === 'hasło' ? 'e' : 'y'} ${key}!`);
    }
}

export default WrongCredentialsException;