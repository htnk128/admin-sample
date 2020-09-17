export interface Account {
  accountId: string,
  name: string,
  namePronunciation: string,
  email: string,
  password: string,
  createdAt: number,
  deletedAt: number | null,
  updatedAt: number
}

interface AccountUpsertRequest {
  type: string
  name: string
  namePronunciation: string
  email: string
}

export interface AccountCreateRequest extends AccountUpsertRequest {
  type: "create"
  password: string
}

export interface AccountUpdateRequest extends AccountUpsertRequest {
  type: "update"
  accountId: string
  password: string | null
}
