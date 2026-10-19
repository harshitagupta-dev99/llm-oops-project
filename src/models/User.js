export class User {
  constructor(name, email) {
    this.id = crypto.randomUUID(); //generates a unique random id
    this.name = name;
    this.email = email;
  }

  getRole() {
    return 'User';
  }
}