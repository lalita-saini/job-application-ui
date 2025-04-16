export class RegisterUser {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  
    constructor(
      email: string = '',  
      password: string = '',
      confirmPassword: string = '',
      firstName: string = '',
      lastName: string = ''
    ) {
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  