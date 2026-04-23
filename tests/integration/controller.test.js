const { TodoService } = require('../../js/model'); //[cite: 5]
const { Controller } = require('../../js/controller'); //[cite: 5]

// Mock the View because we are not testing the UI, only Controller-Model interaction.[cite: 5]
const mockView = {
    update: jest.fn(), //[cite: 5]
    bindAddTodo: jest.fn(), //[cite: 5]
    bindToggleTodo: jest.fn(), //[cite: 5]
    bindRemoveTodo: jest.fn(), //[cite: 5]
};

describe('Controller-Service Integration Tests', () => { //[cite: 5]
    let service; //[cite: 5]
    let controller; //[cite: 5]

    beforeEach(() => {
        service = new TodoService(); //[cite: 5]
        service.todos = []; // Reset singleton for tests[cite: 5]
        controller = new Controller(service, mockView); //[cite: 5]
    });

    test('handleAddTodo should call service.addTodo and update the model', () => { //[cite: 5]
        // Call the controller's handleAddTodo method with some test text.
        controller.handleAddTodo('Test integration task');

        // Then, get the list of todos directly from the service.
        const todos = service.getTodos();

        // Assert that the service's todos array has a length of 1.
        expect(todos.length).toBe(1);

        // Assert that the text of the first todo in the service matches the input.
        expect(todos[0].text).toBe('Test integration task');
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => { //[cite: 5]
        // First, directly add a todo to the service.
        service.addTodo('Task to remove');

        // Get the ID of the new todo.
        const todoId = service.getTodos()[0].id;

        // Call the controller's handleRemoveTodo method with that ID.
        controller.handleRemoveTodo(todoId);

        // Assert that the service's todos array is now empty.
        expect(service.getTodos().length).toBe(0);
    });
});