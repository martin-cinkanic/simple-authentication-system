export class InvalidLoginOrEmail extends Error {
    constructor(message = 'Invalid login or email.') {
      super(message);
      this.name = 'InvalidLoginOrEmail';
    }
  }
  
  export class EmailAlreadyRegistered extends Error {
    constructor(message = 'This email is already registered.') {
      super(message);
      this.name = 'EmailAlreadyRegistered';
    }
  }