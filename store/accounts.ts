import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Account, AccountCreateRequest, AccountUpdateRequest } from '~/models/account/Account';
import AccountRepository from '~/repositories/AxiosAccountRepository';

const repository = new AccountRepository();

export interface AccountsState {
  accounts: Account[];
  account: Account | null;
}

@Module({ stateFactory: true, namespaced: true, name: 'accounts' })
export default class Accounts extends VuexModule implements AccountsState {
  accounts: Account[] = [];
  account: Account | null = null;

  @Mutation
  add(account: Account) {
    this.accounts = [...this.accounts, account];
  }

  @Mutation
  set(account: Account) {
    this.account = account;
  }

  @Mutation
  replace(account: Account) {
    let newAccounts = this.accounts;
    const index = this.accounts.findIndex((s, i, l) => s.accountId == account.accountId);
    newAccounts.splice(index, 1, account);
    this.accounts = newAccounts;
  }

  @Mutation
  remove(accountId: string) {
    let newAccounts = this.accounts;
    const index = this.accounts.findIndex((s, i, l) => s.accountId == accountId);
    newAccounts.splice(index, 1);
    this.accounts = newAccounts;
  }

  @Mutation
  clear() {
    this.accounts = [];
  }

  @Action({ rawError: true })
  async readAccounts() {
    this.clear();
    const accounts = await repository.findAll()
      .catch((error) => {
        throw error
      });
    accounts.forEach((account) => {
      this.add(account)
    });
  }

  @Action({ rawError: true })
  async readAccount(id: string) {
    const account = await repository.find(id)
      .catch((error) => {
        throw error
      });
    this.set(account);
  }

  @Action({ rawError: true })
  async createOrUpdateAccount(request: AccountCreateRequest | AccountUpdateRequest) {
    const account = await repository.add(request)
      .catch((error) => {
        throw error
      });
    this.replace(account);
  }

  @Action({ rawError: true })
  async deleteAccount(id: string) {
    const account = await repository.remove(id)
      .catch((error) => {
        throw error
      });
    this.remove(id);
  }
}
