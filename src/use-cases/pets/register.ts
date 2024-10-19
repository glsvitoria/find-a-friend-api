import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrganizationNotFoundError } from '../errors/organization-not-found-error'

interface PetRegisterRequest {
	pet: {
		name: string
		about?: string
		age: string
		size: string
		requirements_for_adoption: string[]
		energy_level: string
		dependency_level: string
		ambient: string
	}
	organization_id: string
}

interface PetRegisterUseCaseResponse {
	pet: Pet
}

export class PetRegisterUseCase {
	constructor(
		private petsRepository: PetsRepository,
		private organizationsRepository: OrganizationsRepository
	) {}

	async execute(
		data: PetRegisterRequest
	): Promise<PetRegisterUseCaseResponse> {
		const organization = await this.organizationsRepository.findById(
			data.organization_id
		)

		if (!organization) {
			throw new OrganizationNotFoundError()
		}

		const pet = await this.petsRepository.create({
			...data.pet,
			organization: {
				connect: {
					id: organization.id,
				},
			},
		})

		return { pet }
	}
}
