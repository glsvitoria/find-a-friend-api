import { Organization, Pet, Prisma } from '@prisma/client'
import { PetsRepository, PetsRepositorySearchRequest } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
	public organizations: Organization[] = []
	public pets: Pet[] = []

	async create(data: Prisma.PetCreateInput) {
		const pet = {
			id: 'pet-1',
			...data,
			created_at: new Date(),
			updated_at: new Date(),
		}

		this.pets.push(pet)

		return pet
	}

	async findById(id: string) {
		const pet = this.pets.find((pet) => pet.id === id)

		return pet || null
	}

	async search(data: PetsRepositorySearchRequest) {
		const pets = this.pets.filter((pet) => {
			const organization = this.organizations.find(
				(organization) => organization.id === pet.organization_id
			)

			return (
				pet.age === data.age &&
				pet.dependency_level === data.dependency_level &&
				pet.energy_level === data.energy_level &&
				pet.size === data.size &&
				organization?.city === data.city &&
				organization?.state === data.state
			)
		})

		return pets
	}
}
