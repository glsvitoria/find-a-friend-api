import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeOrganizationRegisterUseCase } from '@/use-cases/factories/make-organization-register-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		owner: z.string({
			message: 'O campo de responsável é obrigatório.',
		}),
		email: z
			.string({
				message: 'O campo de email é obrigatório.',
			})
			.email({
				message: 'E-mail inválido.',
			}),
		cep: z
			.string({
				message: 'O campo de CEP é obrigatório.',
			})
			.length(8, {
				message: 'O campo de CEP deve ter 8 dígitos.',
			}),
		city: z.string({
			message: 'O campo de cidade é obrigatório.',
		}),
		state: z.string().length(2),
		street: z.string(),
		number: z.string(),
		complement: z.string(),
		whatsapp: z.string().length(11),
		password: z.string().min(6),
	})

	const data = registerBodySchema.parse(request.body)

	try {
		const registerUseCase = makeOrganizationRegisterUseCase()

		await registerUseCase.execute(data)
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
