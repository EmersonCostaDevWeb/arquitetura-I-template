import { Request, Response } from "express"
import { AccountDatabase } from "../database/AccountDatabase"
import { Account } from "../models/Account"
import { AccountDB } from "../types"
import { AccountBusiness } from "../business/AccountBusiness"

export class AccountController {
    public getAccounts = async (req: Request, res: Response) => {
        try {
            const accountBusiness = new AccountBusiness()
            const result = await accountBusiness.getAccounts()


            res.status(200).send({ result })
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getAccountBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const accountBusiness = new AccountBusiness()
            const balance = await accountBusiness.getAccountBalance(id)

            res.status(200).send(balance)
        } catch (error) {
            console.log(error);
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("erro inesperado")
            }
        }

    }

    public createAccount = async (req: Request, res: Response) => {
        try {
            
            const accountBusiness = new AccountBusiness()
            const {id, ownerId} = req.body
            const result = await accountBusiness.createAccount({id,ownerId})
            res.status(201).send("Conta criada com sucesso")
            
        }catch(erro){
            console.log(erro);
            if(req.statusCode===200){
                res.status(500)
            }
            if(erro instanceof Error){
                res.send(erro.message)
            }else{
                res.send("erro inesperado")
            }
        }
 
    }   
      


    public editAccountBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const value = req.body.value
            
            const accountBusiness = new AccountBusiness()
           
            const result  = await accountBusiness.editAccountBalance({id,value})
            res.status(200).send('valor alterado com sucesso')
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}
