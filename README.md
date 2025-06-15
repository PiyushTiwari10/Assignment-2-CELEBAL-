

## To-Do List Component

This project includes a React To-Do List with the following features:
- Add, remove, and mark tasks as completed
- Input validation (no empty tasks)
- Dynamic task display
- Optional sorting (A-Z, Z-A) and filtering (all, active, completed)
- Tasks persist in localStorage
- Edit tasks with a dedicated edit mode
- Complete button to mark tasks as complete (with an undo option)

### Usage
- Start the app: `npm start`
- The To-Do List appears on the main page.
- Add a task using the input and "Add" button.
- Click a task to mark as complete/incomplete, or use the "Complete" button.
- Edit a task by clicking the "Edit" button, then save your changes.
- Remove a task with the "Remove" button.
- Use the filter and sort dropdowns to view/sort tasks.

### Testing Guidance
- Add tasks and verify they appear in the list.
- Try adding an empty task (should show an error).
- Mark tasks as completed and check their style changes.
- Edit tasks and verify the changes are saved.
- Remove tasks and ensure they disappear.
- Refresh the page: tasks should persist.
- Use filter/sort controls and verify correct behavior.

---
