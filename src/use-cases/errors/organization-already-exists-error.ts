export class OrganizationAlreadyExistsError extends Error {
	constructor() {
		super('E-mail já utilizado em outra organização.')
	}
}
