import Person from './Person'

class Mentor extends Person{
    constructor () {
        const arg = arguments[0];
        super(arg);
    }
}
export default Mentor;