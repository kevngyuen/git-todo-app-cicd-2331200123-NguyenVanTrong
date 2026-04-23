const { test, expect, _electron: electron } = require('@playwright/test'); //[cite: 6]

test('End-to-end user workflow', async () => { //[cite: 6]
    // Launch the Electron app[cite: 6]
    const electronApp = await electron.launch({ args: ['.'] }); //[cite: 6]
    const window = await electronApp.firstWindow(); //[cite: 6]

    const taskText = 'My new E2E test task'; //[cite: 6]

    // --- Task 1: Add a new todo item ---
    // 1. Find the input field
    const todoInput = window.locator('#todo-input');
    
    // 2. Type the `taskText` into it
    await todoInput.fill(taskText);
    
    // 3. Find and click the "Add" button
    const addButton = window.locator('#add-todo-btn');
    await addButton.click();

    // --- Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list.
    // We use filter to ensure we get the specific item we just added
    const todoItem = window.locator('.todo-item').filter({ hasText: taskText });
    
    // 2. Assert that its text content contains the `taskText`
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('.todo-text')).toHaveText(taskText);
    
    // --- Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox within the new todo item
    const checkbox = todoItem.locator('input[type="checkbox"]');
    
    // 2. Click the checkbox
    await checkbox.check();
    
    // 3. Assert that the todo item now has the 'completed' class
    await expect(todoItem).toHaveClass(/completed/);

    // --- Task 4: Delete the todo item ---
    // 1. Find the delete button within the todo item
    const deleteButton = todoItem.locator('.delete-btn');
    
    // 2. Click the delete button
    await deleteButton.click();
    
    // 3. Assert that the todo item is no longer visible on the page
    await expect(todoItem).not.toBeVisible();

    // Close the app[cite: 6]
    await electronApp.close(); //[cite: 6]
}); //[cite: 6]