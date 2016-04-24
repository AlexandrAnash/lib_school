class Task {
    constructor() {
        const arg = arguments[0];
        this.id = arg['id'] || null;
        this.title = arg['title'] || '';
        this.description = arg['description'] || '';
        this.result = '';
        this.rating = 0;
    }
}
export default Task;