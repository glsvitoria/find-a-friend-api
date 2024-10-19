export class PetNotFoundError extends Error {
	constructor() {
		super('Pet não encontrado.')
	}
}
