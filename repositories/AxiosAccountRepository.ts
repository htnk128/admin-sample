import axios from "~/plugins/axios";
import { Account, AccountCreateRequest, AccountUpdateRequest } from "~/models/account/Account";
import AccountRepository from "~/models/account/AccountRepository";

const resourceUrl = "/accounts-api";

interface QueriesObject {
  [key: string]: any
}

export default class AxiosAccountRepository implements AccountRepository {

  private convertModel(json: any): Account {
    return {
      accountId: json.accountId,
      name: json.name,
      namePronunciation: json.namePronunciation,
      email: json.email,
      password: json.password,
      createdAt: json.createdAt,
      deletedAt: json.deletedAt,
      updatedAt: json.updatedAt
    }
  }

  async findAll(): Promise<Account[]> {
    const queries: QueriesObject = {};

    return await axios.get(resourceUrl, { params: queries })
      .then(res => {
        const jsons = res.data.data as any[]
        return jsons.map(json => this.convertModel(json));
      })
      .catch(error => {
        throw error;
      });
  }

  async find(id: string): Promise<Account> {
    return await axios.get(`${resourceUrl}/${id}`)
      .then(res => {
        const json = res.data as any
        return this.convertModel(json);
      })
      .catch(error => {
        throw error;
      });
  }

  async add(request: AccountCreateRequest | AccountUpdateRequest): Promise<Account> {
    const isNew = (arg: any): arg is AccountCreateRequest => arg.type === "create";
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (isNew(request)) {
      return await axios.post(`${resourceUrl}`, {
        name: request.name,
        namePronunciation: request.namePronunciation,
        email: request.email,
        password: request.password
      }, config)
        .then(res => {
          const json = res.data as any
          return this.convertModel(json);
        })
        .catch(error => {
          throw error;
        });
    } else {
      return await axios.put(`${resourceUrl}/${request.accountId}`, {
        name: request.name,
        namePronunciation: request.namePronunciation,
        email: request.email,
        password: request.password
      }, config)
        .then(res => {
          const json = res.data as any
          return this.convertModel(json);
        })
        .catch(error => {
          throw error;
        });
    }
  }

  async remove(id: string): Promise<void> {
    await axios.delete(`${resourceUrl}/${id}`)
      .then(res => {
        const json = res.data as any
        return this.convertModel(json);
      })
      .catch(error => {
        throw error;
      });
  }
}
