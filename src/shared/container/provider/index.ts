import { container } from 'tsyringe';
import { IDateProvider } from './dateProvider/IDateProvider';
import { DateProvider } from './dateProvider/implemenentations/DateProvider';
import { IEmailProvider } from './emailProvider/IEmailProvider';
import { EtherealProvider } from './emailProvider/implementations/EtherealProvider';
import { IStorageProvider } from '@shared/container/provider/storageProvider/IStorageProvider';
import { LocalStorageProvider } from './storageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './storageProvider/implementations/S3StorageProvider';


container.registerSingleton<IDateProvider>(
    "dateProvider",
    DateProvider
)

/**
 * como foi passado a configuração dentro do construtor, o registerSingleton não consegue pegar
 * antes do envio então a soluçao e passar o registerInstance para que ele possa acessar 
 * o construtor e executar as configurações antes de enviar.
 */
container.registerInstance<IEmailProvider>(
    "emailProvider",
    new EtherealProvider()
)

container.registerSingleton<IStorageProvider>(
    "storageProvider",
    process.env.DISK_STORAGE == "local" ? LocalStorageProvider : S3StorageProvider
)