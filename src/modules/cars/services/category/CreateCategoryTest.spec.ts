import { AppError } from "@errors/AppError";
import { CategoriesRepositoryTest } from "@modules/cars/repositories/tests/CategoriesRepositoryTest";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryTest: CategoriesRepositoryTest;


// descrece qual é o test
describe("Criar uma nova categoria", () => {

    // Executa antes de cada teste
    beforeEach(() => {
        categoriesRepositoryTest = new CategoriesRepositoryTest();
         createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryTest);
    })

    it("Deve criar uma nova categoria", async () => {

       
        const category = {
            name: "nova categoria",
            description: "Teste de criação de categoria"
        }

        await createCategoryUseCase.execute({ name: category.name, description: category.description })

        const createCategory = await categoriesRepositoryTest.categoryByName(category.name)

        expect(createCategory).toHaveProperty("name")
    })


    it("Não pode criar uma categoria com mesmo nome", async () => {
        
        expect(async () => {

            const category = {
                name: "nova",
                description: "Teste de criação de categoria"
            }

            await createCategoryUseCase.execute({ name: category.name, description: category.description })

            await createCategoryUseCase.execute({ name: category.name, description: category.description })


        }).rejects.toBeInstanceOf(AppError)
    })

})