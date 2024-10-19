import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makePetRegisterUseCase } from '@/use-cases/factories/make-pet-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string({
			message: 'O campo nome é obrigatório.',
		}),
		about: z.string().optional(),
		age: z.enum(['1', '2', '3', '4', '5'], {
			message:
				'O campo de idade é obrigatório e ser bebê, filhote, adolescente, adulto ou idoso.',
		}),
		size: z.enum(['1', '2', '3', '4'], {
			message:
				'O campo de tamanho é obrigatório e deve ser pequeno, médio, grande ou gigante.',
		}),
		requirements_for_adoption: z.array(z.string()),
		dependency_level: z.enum(['1', '2', '3'], {
			message:
				'O nível de dependência é obrigatório e deve ser baixo, médio ou alto.',
		}),
		energy_level: z.enum(['1', '2', '3'], {
			message:
				'O campo de nível de energia é obrigatório e deve ser baixo, médio ou alto.',
		}),
		ambient: z.enum(['1', '2', '3', '4'], {
			message:
				'O campo de ambiente é obrigatório e deve ser fechado, aberto, intermediário ou amplo.',
		}),
	})

	const data = registerBodySchema.parse(request.body)

	try {
		const registerUseCase = makePetRegisterUseCase()

		await registerUseCase.execute({
			pet: data,
			organization_id: request.user.sub,
		})
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
