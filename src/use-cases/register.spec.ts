import { it, describe, expect } from 'vitest'
import { RegisterOrganizationUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

describe('Register Use Case', () => {
	it('should be able to register a new organization', async () => {
		const organizationsRepository = new InMemoryOrganizationsRepository()
		const registerUseCase = new RegisterOrganizationUseCase(
			organizationsRepository
		)

		const { organization } = await registerUseCase.handle({
			owner: 'Guilherme Vitória',
			email: 'guivitoria@hotmail.com',
			cep: '12345678',
			city: 'Salvador',
			state: 'BA',
			street: 'Rua Teste',
			number: '1',
			complement: 'Complemento',
			whatsapp: '71999999999',
			password: '123456',
		})

		expect(organization.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const organizationsRepository = new InMemoryOrganizationsRepository()
		const registerUseCase = new RegisterOrganizationUseCase(
			organizationsRepository
		)

		const { organization } = await registerUseCase.handle({
			owner: 'Guilherme Vitória',
			email: 'guivitoria@hotmail.com',
			cep: '12345678',
			city: 'Salvador',
			state: 'BA',
			street: 'Rua Teste',
			number: '1',
			complement: 'Complemento',
			whatsapp: '71999999999',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			organization.password_hash
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twitch', async () => {
		const organizationsRepository = new InMemoryOrganizationsRepository()
		const registerUseCase = new RegisterOrganizationUseCase(
			organizationsRepository
		)

		await registerUseCase.handle({
			owner: 'Guilherme Vitória',
			email: 'guivitoria@hotmail.com',
			cep: '12345678',
			city: 'Salvador',
			state: 'BA',
			street: 'Rua Teste',
			number: '1',
			complement: 'Complemento',
			whatsapp: '71999999999',
			password: '123456',
		})

		await expect(() =>
			registerUseCase.handle({
				owner: 'Guilherme Vitória',
				email: 'guivitoria@hotmail.com',
				cep: '12345678',
				city: 'Salvador',
				state: 'BA',
				street: 'Rua Teste',
				number: '1',
				complement: 'Complemento',
				whatsapp: '71999999999',
				password: '123456',
			})
		).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
	})
})
