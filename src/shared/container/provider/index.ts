
import { container } from 'tsyringe';
import { IDateProvider } from './IDateProvider';
import { DateProvider } from './implemenentations/DateProvider';


container.registerSingleton<IDateProvider>(
    "dateProvider",
    DateProvider
)
