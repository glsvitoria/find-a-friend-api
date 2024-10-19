import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: OrganizationAuthenticateUseCase

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		organizationsRepository = new InMemoryOrganizationsRepository()
		sut = new OrganizationAuthenticateUseCase(organizationsRepository)
	})

	it('should be able to authenticate', async () => {
		await organizationsRepository.create({
			owner: 'John Doe',
			email: 'teste@gmail.com',
			cep: '123456',
			city: 'Salvador',
			state: 'BA',
			street: 'Rua Teste',
			number: '1',
			complement: 'Complemento',
			whatsapp: '71999999999',
			password_hash: await hash('123456', 6),
		})

		const { organization } = await sut.execute({
			email: 'teste@gmail.com',
			password: '123456',
		})

		expect(organization.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() =>
			sut.execute({
				email: 'teste@gmail.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong email', async () => {
		await organizationsRepository.create({
			owner: 'John Doe',
			email: 'teste@gmail.com',
			cep: '123456',
			city: 'Salvador',
			state: 'BA',
			street: 'Rua Teste',
			number: '1',
			complement: 'Complemento',
			whatsapp: '71999999999',
			password_hash: await hash('123456', 6),
		})

		await expect(() =>
			sut.execute({
				email: 'teste@gmail.com',
				password: '123123',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
