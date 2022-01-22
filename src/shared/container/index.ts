
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/account/repositories/implementatios/UsersRepository';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { IEspecificationsRepository } from '@modules/cars/repositories/IEspecificationsRepository';

import { CategoriesRespository } from '@modules/cars/repositories/implementations/CategoriesRespository'
import { EspecificationsRepositories } from '@modules/cars/repositories/implementations/EspecificationsRepositories';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/repositories/implementations/CarsRespository';

container.registerSingleton<ICategoriesRepository>
    ("CategoriesRepository", CategoriesRespository);

container.registerSingleton<IEspecificationsRepository>
    ("EspecificationsRepository", EspecificationsRepositories);

container.registerSingleton<IUsersRepository>
    ("usersRepository", UsersRepository);

container.registerSingleton<ICarsRepository>
    ("carsRepository", CarsRepository);