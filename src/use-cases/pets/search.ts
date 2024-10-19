import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface PetRegisterRequest {
	city: string
	state: string
	age?: string
	size?: string
	energy_level?: string
	dependency_level?: string
}

interface PetRegisterUseCaseResponse {
	pets: Pet[]
}

export class PetSearchUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(
		data: PetRegisterRequest
	): Promise<PetRegisterUseCaseResponse> {
		const pets = await this.petsRepository.search({
			...data,
		})

		return { pets }
	}
}
