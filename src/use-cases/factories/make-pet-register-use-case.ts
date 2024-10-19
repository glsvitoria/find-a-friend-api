import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetRegisterUseCase } from '../pets/register'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makePetRegisterUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const organizationsRepository = new PrismaOrganizationsRepository()
	const registerUseCase = new PetRegisterUseCase(
		petsRepository,
		organizationsRepository
	)

	return registerUseCase
}
