describe('To-Do List App', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' }).as('getTasks');
      cy.visit('index.html'); 
    });
  
    it('should load tasks on page load', () => {
      cy.wait('@getTasks');
      cy.get('.task-item').should('have.length', 3);
    });
  
    it('should add a new task', () => {
      cy.get('#taskInput').type('New Task');
      cy.get('#addTaskBtn').click();
      cy.get('.task-item').should('have.length', 4).last().should('contain', 'New Task');
    });
  
    it('should mark a task as completed', () => {
      cy.get('.task-item').first().find('input[type="checkbox"]').check();
      cy.get('.task-item').first().should('have.class', 'completed');
    });
  
    it('should delete a task', () => {
      cy.get('.task-item').first().find('.delete-btn').click();
      cy.get('.task-item').should('have.length', 2);
    });
  
    it('should display an error message on API failure', () => {
      cy.intercept('GET', '/api/tasks', { statusCode: 500 }).as('getTasksError');
      cy.reload();
      cy.wait('@getTasksError');
      cy.get('#errorMessage').should('be.visible');
    });
  });
  