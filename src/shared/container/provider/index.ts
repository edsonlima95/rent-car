
import { container } from 'tsyringe';
import { IDateProvider } from './dateProvider/IDateProvider';
import { DateProvider } from './dateProvider/implemenentations/DateProvider';
import { IEmailProvider } from './emailProvider/IEmailProvider';
import { EtherealProvider } from './emailProvider/implementations/EtherealProvider';


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
