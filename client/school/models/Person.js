class Person {
    constructor() {
        const arg = arguments[0];
        this.id = arg['id'] || null;
        this.firstName = arg['firstName'] || '';
        this.middleName = arg['middleName'] || '';
        this.lastName = arg['lastName'] || '';
        this.fullName = this.firstName + ' ' + this.middleName + ' ' + this.lastName;
    }

}
export default Person;