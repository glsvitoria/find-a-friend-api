import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetFindUniqueUseCase } from '../pets/find-unique'

export function makePetFindUniqueUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const registerUseCase = new PetFindUniqueUseCase(petsRepository)

	return registerUseCase
}
