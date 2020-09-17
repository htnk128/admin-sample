<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout column justify-center>
      <v-flex xs12 sm8 md6>
        <v-row v-if="accountId != null" dense>
          <v-col>
            <v-btn
              color="error"
              class="mr-4"
              @click="deleteConfirm"
              :disabled="!updatable()"
            >
              <v-icon>mdi-delete</v-icon>delete
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="accountId != null" dense>
          <v-col>
            <v-text-field v-model="accountId" label="Id" disabled />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="name"
              :counter="100"
              :rules="rules.nameRules"
              label="Name"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="namePronunciation"
              :counter="100"
              :rules="rules.namePronunciationRules"
              label="NamePronunciation"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="email"
              :counter="100"
              :rules="rules.emailRules"
              label="Email"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="password"
              :counter="100"
              :rules="rules.passwordRules"
              label="Password"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-btn
              v-if="accountId == null"
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              <v-icon>mdi-plus</v-icon>add
            </v-btn>
            <v-btn
              v-else
              :disabled="!valid || !updatable()"
              color="warning"
              class="mr-4"
              @click="submit"
            >
              <v-icon>mdi-pencil</v-icon>edit
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col>
            <v-btn color="grey" class="mr-4" :to="'/account'"> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <c-confirm-dialog v-if="accountId != null" ref="confirm" />
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { accountsStore } from "~/store";
import { Account } from "~/models/account/Account";
import cConfirmDialog from "~/components/common/ConfirmDialog.vue";

@Component({
  components: {
    cConfirmDialog,
  },
})
export default class AccountForm extends Vue {
  @Prop({ type: String, default: null })
  accountId?: string | null;

  loading: boolean = false;
  valid: boolean = false;
  account: Account | null = null;
  name: string = "";
  namePronunciation: string = "";
  email: string = "";
  password: string = "";
  rules: object = {
    nameRules: [
      (v: string) => !!v || "Name is required",
      (v: string) =>
        (v && v.length <= 100) || "Name must be less than 100 characters",
    ],
    namePronunciationRules: [
      (v: string) => !!v || "NamePronunciation is required",
      (v: string) =>
        (v && v.length <= 100) ||
        "NamePronunciation must be less than 100 characters",
    ],
    emailRules: [
      (v: string) => !!v || "Email is required",
      (v: string) =>
        (v && v.length <= 100) || "Email must be less than 100 characters",
    ],
    passwordRules: [
      (v: string) => (!!this.accountId && !v) || !!v || "Password is required",
      (v: string) =>
        (!!this.accountId && !v) ||
        (v && v.length >= 6 && v.length <= 100) ||
        "Password must be between 6 and 100 characters",
    ],
  };

  async search() {
    if (!!this.$props.accountId) {
      this.loading = true;
      await accountsStore.readAccount(this.$props.accountId);
      this.account = accountsStore.account;
      if (!!this.account) {
        this.setData(this.account);
      }
      this.loading = false;
    }
  }

  async upsert() {
    await accountsStore.createOrUpdateAccount(
      !this.$props.accountId
        ? {
            type: "create",
            name: this.name,
            namePronunciation: this.namePronunciation,
            email: this.email,
            password: this.password,
          }
        : {
            type: "update",
            accountId: this.$props.accountId,
            name: this.name,
            namePronunciation: this.namePronunciation,
            email: this.email,
            password: this.password ? this.password : null,
          }
    );

    this.$router.back();
  }

  async delete() {
    if (this.$props.accountId) {
      await accountsStore.deleteAccount(this.$props.accountId);
      this.$router.back();
    }
  }

  private setData(account: Account) {
    this.name = account.name;
    this.namePronunciation = account.namePronunciation;
    this.email = account.email;
  }

  submit() {
    if (this.refs.form.validate()) {
      this.upsert();
    }
  }

  async deleteConfirm() {
    if (
      await this.refs.confirm.open(
        "Delete",
        "Are you sure you want to delete the data?"
      )
    ) {
      this.delete();
    }
  }

  get refs(): any {
    return this.$refs;
  }

  async created() {
    this.search();
  }

  private updatable() {
    return !!this.account && !this.account.deletedAt;
  }
}
</script>
