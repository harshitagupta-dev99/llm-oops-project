import { User } from './User.js';

export class Admin extends User {
  constructor(name, email) {
    super(name, email);
  }

  getRole() { //polymorphism - overriding the parent class ka same method 
    return 'Admin';
  }
}