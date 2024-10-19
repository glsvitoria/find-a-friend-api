import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetSearchUseCase } from '../pets/search'

export function makePetSearchUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const searchUseCase = new PetSearchUseCase(petsRepository)

	return searchUseCase
}
