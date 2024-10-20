import { Organization, Pet, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { PetsRepository, PetsRepositorySearchRequest } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
	public organizations: Organization[] = []
	public pets: Pet[] = []

    create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet = {
            
        }
    }


    findById(id: string): Promise<Pet | null> {
        
    }

    search(data: PetsRepositorySearchRequest): Promise<Pet[]> {
        
    }
}
