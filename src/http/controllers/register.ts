import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { RegisterOrganizationUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		owner: z.string(),
		email: z.string().email(),
		cep: z.string().length(8),
		city: z.string(),
		state: z.string().length(2),
		street: z.string(),
		number: z.string(),
		complement: z.string(),
		whatsapp: z.string().length(11),
		password: z.string().min(6),
	})

	const data = registerBodySchema.parse(request.body)

	try {
		const organizationsRepository = new PrismaOrganizationsRepository()
		const registerUseCase = new RegisterOrganizationUseCase(
			organizationsRepository
		)
		await registerUseCase.handle(data)
	} catch (err) {
		if (err instanceof OrganizationAlreadyExistsError) {
			return reply.status(409).send({
				message: err.message,
			})
		}

		throw err
	}

	return reply.status(201).send()
}
