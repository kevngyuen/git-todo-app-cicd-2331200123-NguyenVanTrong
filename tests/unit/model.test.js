const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation[cite: 4]
        service = new TodoService();
        // Reset the singleton's state for testing purposes[cite: 4]
        service.todos = [];
    });

    test('should add a new todo', () => {
        // Call the addTodo method with some text
        service.addTodo('Write unit tests');
        
        const todos = service.getTodos();

        // Assert that the service's todos array has a length of 1
        expect(todos.length).toBe(1);
        
        // Assert that the text of the first todo matches the input text
        expect(todos[0].text).toBe('Write unit tests');
        
        // Ensure the default state is not completed
        expect(todos[0].completed).toBe(false); 
    });

    test('should toggle the completed state of a todo', () => {
        // First, add a todo
        service.addTodo('Task to toggle');
        
        // Get its ID
        const todoId = service.getTodos()[0].id;

        // Call the toggleTodoComplete method
        service.toggleTodoComplete(todoId);
        
        // Assert that the 'completed' property of that todo is now true
        expect(service.getTodos()[0].completed).toBe(true);

        // Call toggleTodoComplete again
        service.toggleTodoComplete(todoId);
        
        // Assert that it's false
        expect(service.getTodos()[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        // Add a todo
        service.addTodo('Task to remove');
        
        // Get its ID
        const todoId = service.getTodos()[0].id;

        // Call the removeTodo method
        service.removeTodo(todoId);

        // Assert that the service's todos array is now empty (length of 0)
        expect(service.getTodos().length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // Call addTodo with an empty string
        service.addTodo('');
        
        // Assert that the todos array still has a length of 0
        expect(service.getTodos().length).toBe(0);
        
        // Check for null and undefined as well for robustness
        service.addTodo(null);
        service.addTodo(undefined);
        expect(service.getTodos().length).toBe(0);
    });
});