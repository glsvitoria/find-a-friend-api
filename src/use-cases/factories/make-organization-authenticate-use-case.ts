import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { OrganizationAuthenticateUseCase } from '../organization/authenticate'

export function makeOrganizationAuthenticateUseCase() {
	const organizationsRepository = new PrismaOrganizationsRepository()
	const organizationAuthenticateUseCase = new OrganizationAuthenticateUseCase(
		organizationsRepository
	)

	return organizationAuthenticateUseCase
}
