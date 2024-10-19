import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, PetsRepositorySearchRequest } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async create(data: Prisma.PetCreateInput) {
		const pet = await prisma.pet.create({
			data,
		})

		return pet
	}

	async findById(id: string): Promise<Pet | null> {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
			include: {
				organization: true,
			},
		})

		return pet
	}

	async search(data: PetsRepositorySearchRequest): Promise<Pet[]> {
		const pets = await prisma.pet.findMany({
			where: {
				age: data.age,
				dependency_level: data.dependency_level,
				energy_level: data.energy_level,
				size: data.size,
				organization: {
					city: data.city,
					state: data.state,
				},
			},
		})

		return pets
	}
}
