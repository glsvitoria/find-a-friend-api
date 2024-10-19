export class InvalidCredentialsError extends Error {
	constructor() {
		super('Credenciais de acesso inválidas.')
	}
}
