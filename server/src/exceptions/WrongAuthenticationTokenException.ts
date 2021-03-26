import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, 'Musisz zalogować się ponownie!!!');
    }
}

export default WrongAuthenticationTokenException;