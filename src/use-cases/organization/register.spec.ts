import { it, describe, expect } from 'vitest'
import { OrganizationRegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { beforeEach } from 'node:test'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: OrganizationRegisterUseCase

describe('Organization Register Use Case', () => {
	beforeEach(() => {
		organizationsRepository = new InMemoryOrganizationsRepository()
		sut = new OrganizationRegisterUseCase(organizationsRepository)
	})

	it('should be able to register a new organization', async () => {
		const { organization } = await sut.execute({
			owner: 'John Doe',
			email: 'teste@gmail.com',
			cep: '123456',
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
		const sut = new OrganizationRegisterUseCase(organizationsRepository)

		const { organization } = await sut.execute({
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
		const sut = new OrganizationRegisterUseCase(organizationsRepository)

		await sut.execute({
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
			sut.execute({
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
