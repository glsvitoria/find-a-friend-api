import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'

interface OrganizationAuthenticateUseCaseRequest {
	email: string
	password: string
}

interface OrganizationAuthenticateUseCaseResponse {
	organization: Organization
}

export class OrganizationAuthenticateUseCase {
	constructor(private organizationsRepository: OrganizationsRepository) {}

	async execute({
		email,
		password,
	}: OrganizationAuthenticateUseCaseRequest): Promise<OrganizationAuthenticateUseCaseResponse> {
		const organization =
			await this.organizationsRepository.findByEmail(email)

		if (!organization) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(
			password,
			organization.password_hash
		)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			organization,
		}
	}
}
