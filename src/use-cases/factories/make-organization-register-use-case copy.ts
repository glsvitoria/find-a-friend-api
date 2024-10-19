import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { OrganizationRegisterUseCase } from '../organization/register'

export function makeOrganizationRegisterUseCase() {
	const organizationsRepository = new PrismaOrganizationsRepository()
	const registerUseCase = new OrganizationRegisterUseCase(
		organizationsRepository
	)

	return registerUseCase
}
