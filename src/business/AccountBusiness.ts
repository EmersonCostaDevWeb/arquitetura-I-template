import { AccountDatabase } from "../database/AccountDatabase";
import { Account } from "../models/Account";
import { AccountBalance, AccountDB, AccountDBPost, EditBalance} from "../types";

export class AccountBusiness {
    public getAccounts = async (): Promise<Account[]> => {
        const accountDatabase = new AccountDatabase()
        const accountsDB: AccountDB[] = await accountDatabase.findAccounts()

        const accounts = accountsDB.map((accountDB) => new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        ))
        return accounts
    }
    public getAccountBalance = async (input: string): Promise<number> => {
        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(input)
        if (!accountDB) {
            throw new Error("'id' não encontrado")
        }
        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )
        const balance = account.getBalance()
        return balance
    }
    public createAccount = async (input: AccountBalance): Promise<void> => {
        const accountDatabase = new AccountDatabase()
        const { id, ownerId } = input
        if (typeof id !== "string") {
            throw new Error("'id' deve ser um string")
        }
        if (typeof ownerId !== "string") {
            throw new Error("'ownerId' deve ser um string")
        }
        const accountDBExists = await accountDatabase.findAccountById(id)
        if (accountDBExists) {
            throw new Error("'id' já existe")
        }
        const newAccount = new Account(
            id,
            0,
            ownerId,
            new Date().toISOString()
        )
        const newAccountDB: AccountDB={
            id: newAccount.getId(),
            balance:newAccount.getBalance(),
            owner_id:newAccount.getOwnerId(),
            created_at:newAccount.getOwnerId()
        }
        
        await accountDatabase.insertAccount(newAccountDB)
    }
    public editAccountBalance =async (input:EditBalance):Promise<AccountDB> => {
        const {id, value }= input  
        if (typeof value !== "number") {
            throw new Error("'value' deve ser number")
        }

        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(id)

        if (!accountDB) {
            throw new Error("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const newBalance = account.getBalance() + value
        account.setBalance(newBalance)

        await accountDatabase.updateBalanceById(id, newBalance)
        return accountDB
    }
}
