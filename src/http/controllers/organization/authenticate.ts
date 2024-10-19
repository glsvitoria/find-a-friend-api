import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeOrganizationAuthenticateUseCase } from '@/use-cases/factories/make-organization-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const data = authenticateBodySchema.parse(request.body)

	try {
		const authenticateUseCase = makeOrganizationAuthenticateUseCase()

		const { organization } = await authenticateUseCase.execute(data)

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: organization.id,
				},
			}
		)

		const refreshToken = await reply.jwtSign(
			{},
			{
				sign: {
					sub: organization.id,
					expiresIn: '7d',
				},
			}
		)

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
			})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({
				message: err.message,
			})
		}

		throw err
	}
}
