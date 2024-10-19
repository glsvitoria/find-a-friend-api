import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
	async findById(id: string): Promise<Organization | null> {
		const organization = await prisma.organization.findUnique({
			where: {
				id,
			},
		})

		return organization
	}
	async findByEmail(email: string) {
		const organization = await prisma.organization.findUnique({
			where: {
				email,
			},
		})

		return organization
	}
	async create(data: Prisma.OrganizationCreateInput) {
		const organization = await prisma.organization.create({
			data,
		})

		return organization
	}
}
