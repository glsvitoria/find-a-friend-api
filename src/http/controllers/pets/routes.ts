import { FastifyInstance } from 'fastify'
import { register } from './register'
import { findUnique } from './find-unique'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets', search)

	/** Authenticated */
	app.post(
		'/pets',
		{
			onRequest: [verifyJWT],
		},
		register
	)

	app.get(
		'/pets/:pet_id',
		{
			onRequest: [verifyJWT],
		},
		findUnique
	)
}
