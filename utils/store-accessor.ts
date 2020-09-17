import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Accounts from '~/store/accounts';

let accountsStore: Accounts;

function initializeStores(store: Store<any>): void {
  accountsStore = getModule(Accounts, store);
}

export { initializeStores, accountsStore }
