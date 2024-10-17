import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
	implements OrganizationsRepository
{
	public organizations: Organization[] = []

	async create(data: Prisma.OrganizationCreateInput) {
		const organization = {
			id: 'organization-1',
			...data,
			created_at: new Date(),
			updated_at: new Date(),
		}

		this.organizations.push(organization)

		return organization
	}

	async findByEmail(email: string) {
		const organization = this.organizations.find(
			(organization) => organization.email === email
		)

		return organization || null
	}
}
