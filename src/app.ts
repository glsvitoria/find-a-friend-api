import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
import { organizationRoutes } from './http/controllers/organization/routes'
import fastifyJwt from '@fastify/jwt'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})

app.register(fastifyCookie)

app.register(organizationRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: error.issues[0].message,
			issues: error.issues,
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({
		message: 'Erro interno do servidor.',
	})
})
