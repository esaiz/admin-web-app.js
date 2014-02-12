'use strict';

describe('Form: Login', function () {

	// load the controller's module
	beforeEach(module('adminPanelApp'));
	beforeEach(module('templates'));

	var element, scope,
		mockLogin = {
			email: 'test@test.com',
			password: '123123',
			remember: true
		};

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope){
		// Compile a piece of HTML containing the directive
		element = $compile('<login-form></login-form>')($rootScope);

		// Compile
		$rootScope.$apply();

		// Save element scope
		scope = element.isolateScope();
	}));

	it('Replaces the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element.find('[type="email"]').length).toBe(1); // 1 email input
		expect(element.find('[type="password"]').length).toBe(1); // 1 password input
		expect(element.find('[type="checkbox"]').length).toBe(1); // 1 checkbox
		expect(element.find('[type="submit"]').length).toBe(1); // 1 submit button
	});

	it('Updating scope will update the form inputs.', function() {
		// mockLogin data is cloned to avoid its pollution
		scope.login = $.extend({}, mockLogin);
		scope.$apply();

		expect(element.find('[type="email"]').val()).toBe(scope.login.email);
		expect(element.find('[type="password"]').val()).toBe(scope.login.password);
		expect(element.find('[type="checkbox"]').prop('checked')).toBe(scope.login.remember);
	});

	it('Form is validated.', function() {
		// mockLogin data is cloned to avoid its pollution
		scope.login = $.extend({}, mockLogin);
		scope.$apply();
		expect(scope.loginForm.$valid).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-valid');
		expect(element.find('[type="password"]')).toHaveClass('ng-valid');

		// Missing email field
		scope.login.email = '';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.email.$error.required).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-invalid');

		// Invalid email field
		scope.login.email = 'not_an_email';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.email.$error.email).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-invalid');

		// Missing password field
		scope.login.email = mockLogin.email;
		scope.login.password = '';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.password.$error.required).toBeTruthy();
		expect(element.find('[type="password"]')).toHaveClass('ng-invalid');

	});

});