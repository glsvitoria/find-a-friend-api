import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { makePetFindUniqueUseCase } from '@/use-cases/factories/make-pet-find-unique-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findUnique(request: FastifyRequest, reply: FastifyReply) {
	const findUniqueParamsSchema = z.object({
		pet_id: z.string({
			message: 'O parâmetro pet_id é obrigatório.',
		}),
	})

	const data = findUniqueParamsSchema.parse(request.params)

	try {
		const findUniqueUseCase = makePetFindUniqueUseCase()

		const { pet } = await findUniqueUseCase.execute({
			pet_id: data.pet_id,
		})

		return reply.status(200).send({ ...pet })
	} catch (err) {
		if (err instanceof PetNotFoundError) {
			return reply.status(404).send({
				message: err.message,
			})
		}

		throw err
	}
}
