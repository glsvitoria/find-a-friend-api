import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makePetSearchUseCase } from '@/use-cases/factories/make-pet-search-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
	const searchQueryParamsSchema = z.object({
		city: z.string({
			message: 'O campo cidade é obrigatório.',
		}),
		state: z
			.string({
				message: 'O campo estado é obrigatório.',
			})
			.length(2, {
				message: 'O campo estado deve ter 2 caracteres.',
			}),
		age: z.enum(['1', '2', '3', '4', '5']).optional(),
		size: z.enum(['1', '2', '3', '4']).optional(),
		dependency_level: z.enum(['1', '2', '3']).optional(),
		energy_level: z.enum(['1', '2', '3']).optional(),
	})

	const data = searchQueryParamsSchema.parse(request.query)

	try {
		const searchUseCase = makePetSearchUseCase()

		const pets = await searchUseCase.execute({
			...data,
		})

		return reply.status(200).send({
			...pets,
		})
	} catch (err) {
		throw err
	}
}
