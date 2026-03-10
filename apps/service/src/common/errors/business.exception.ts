import { CustomBaseException } from './custom.exception';
import { ErrorCode } from './enum';

export class NotFoundException extends CustomBaseException {
  constructor(message: string) {
    super({
      code: ErrorCode.NOT_FOUND,
      message,
    });
  }
}

export class AlreadyExistsException extends CustomBaseException {
  constructor(message: string) {
    super({
      code: ErrorCode.ALREADY_EXISTS,
      message,
    });
  }
}

export class BusinessException extends CustomBaseException {
  constructor(code: ErrorCode, message: string) {
    super({
      code,
      message,
    });
  }
}