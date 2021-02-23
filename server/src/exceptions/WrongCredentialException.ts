import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
    constructor(key: 'password' | 'email') {
        super(401, `Wrong credentials provided - wrong ${key}!`);
    }
}

export default WrongCredentialsException;