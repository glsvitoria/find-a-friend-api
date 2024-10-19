import { Pet, Prisma } from '@prisma/client'

export interface PetsRepositorySearchRequest {
	city: string
	state: string
	age?: string
	size?: string
	energy_level?: string
	dependency_level?: string
}

export interface PetsRepository {
	create(data: Prisma.PetCreateInput): Promise<Pet>
	findById(id: string): Promise<Pet | null>
	search(data: PetsRepositorySearchRequest): Promise<Pet[]>
}
