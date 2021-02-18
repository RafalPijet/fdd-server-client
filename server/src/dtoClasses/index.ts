import { LoginDto } from './login.dto';
import { ValidatorKeys } from '../controllers/decorators/bodyValidator';

export const availableDto = {
    [ValidatorKeys.login]: LoginDto
}

export * from './login.dto';