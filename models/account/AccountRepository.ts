import { Account, AccountCreateRequest, AccountUpdateRequest } from "./Account";

export default interface AccountRepository {
  findAll(name: string): Promise<Account[]>

  find(id: string): Promise<Account>

  add(request: AccountCreateRequest | AccountUpdateRequest): Promise<Account>

  remove(id: string): Promise<void>
}
