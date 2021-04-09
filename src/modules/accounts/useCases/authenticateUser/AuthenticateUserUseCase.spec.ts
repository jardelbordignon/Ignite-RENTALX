import { ICreateUserDTO } from '@/modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@/modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AppError } from '@/shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
  })

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '12345678910',
      email: 'user@email.com',
      password: '1234',
      name: 'User',
    }

    await createUserUseCase.execute(user)

    const authInfo = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(authInfo).toHaveProperty('token')
  })

  it('Should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non-existent@email.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })

  it('Should not be able to authenticate with incorrent password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '12345678910',
      email: 'user@email.com',
      password: '1234',
      name: 'User',
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })
})
