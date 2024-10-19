import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found'

interface PetFindUniqueRequest {
	pet_id: string
}

interface PetFindUniqueUseCaseResponse {
	pet: Pet
}

export class PetFindUniqueUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(
		data: PetFindUniqueRequest
	): Promise<PetFindUniqueUseCaseResponse> {
		const pet = await this.petsRepository.findById(data.pet_id)

		if (!pet) {
			throw new PetNotFoundError()
		}

		return { pet }
	}
}
