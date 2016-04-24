import Person from './Person'

class Student extends Person{
    constructor () {
        const arg = arguments[0];
        super(arguments);
        this.groupId = arg['groupId'] || 0;
    }
}
export default Student;