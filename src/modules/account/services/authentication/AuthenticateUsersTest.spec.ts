import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRespositoryTest } from "@modules/account/repositories/tests/UsersRespositoryTest";
import { UsersUseCase } from "../user/UsersUseCase";
import { AppError } from "@errors/AppError";

// Tipagem
let usersRespositoryTest: UsersRespositoryTest;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersUseCase: UsersUseCase;


describe("Autenticação de usuários", () => {

    // Instâcnia antes dos testes.
    beforeEach(() => {
        usersRespositoryTest = new UsersRespositoryTest()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRespositoryTest);
        usersUseCase = new UsersUseCase(usersRespositoryTest);
    })

    it("Deve criar um usuario e fazer a autenticação", async () => {

        const user = {
            name: "edson",
            email: "test@hotmail.com",
            password: "1234345",
            drive_license: "000987"
        }

        //Criar um usuario
        await usersUseCase.execute(user)

        // Executa a autenticação
        const response = await authenticateUserUseCase.execute({ email: user.email, password: user.password })

        expect(response).toHaveProperty("token")

    })

    it("Não deve autenticar com email incorreto", () => {

        expect(async () => {
            // Executa a autenticação
            await authenticateUserUseCase.execute({ email: "false@hotmail.com", password: "1234" })

        }).rejects.toBeInstanceOf(AppError)

    })

    it("Não deve autenticar com password incorreto", () => {

        expect(async () => {
            const user = {
                name: "edson",
                email: "test@hotmail.com",
                password: "1234",
                drive_license: "000987"
            }

            //Criar um usuario
            await usersUseCase.execute(user)

            // Executa a autenticação
            await authenticateUserUseCase.execute({ email: user.email, password: "incorrect" })

        }).rejects.toBeInstanceOf(AppError)

    })


})