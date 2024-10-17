import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseProps {
	owner: string
	email: string
	cep: string
	city: string
	state: string
	street: string
	number: string
	complement: string
	whatsapp: string
	password: string
}

interface RegisterOrganizationUseCaseResponse {
	organization: Organization
}

export class RegisterOrganizationUseCase {
	constructor(private organizationsRepository: any) {}

	async handle(
		data: RegisterUseCaseProps
	): Promise<RegisterOrganizationUseCaseResponse> {
		const password_hash = await hash(data.password, 6)

		const userWithSameEmail =
			await this.organizationsRepository.findByEmail(data.email)

		if (userWithSameEmail) {
			throw new OrganizationAlreadyExistsError()
		}

		const { password, ...dataWithoutPassword } = data

		const organization = await this.organizationsRepository.create({
			...dataWithoutPassword,
			password_hash,
		})

		return { organization }
	}
}
