<template>
  <section class="container">
    <h1 class="maintitle">
      Account
      <span class="subtitle">list</span>
    </h1>
    <hr class="my-1" />
    <v-layout column justify-center>
      <v-flex xs12 sm8 md6>
        <v-row dense>
          <v-col>
            <c-search-form :loading.sync="loading" :search="search">
              <template v-slot:body>
              </template>
            </c-search-form>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-data-table
              v-if="accounts != null"
              :headers="headers"
              :items="accounts"
              :loading="loading"
              :footer-props="{
                'items-per-page-options': [10, 20, 50, 100, 200, 300, 400, 500],
                showFirstLastPage: true,
              }"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-spacer />
                  <v-btn
                    fab
                    small
                    class="mx-2"
                    color="primary"
                    :to="'account/add'"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:[`item.createdAt`]="{ item }">
                {{ format(item.createdAt) }}
              </template>
              <template v-slot:[`item.updatedAt`]="{ item }">
                {{ format(item.updatedAt) }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  fab
                  small
                  class="mx-2"
                  color="warning"
                  :to="`account/${item.accountId}/edit`"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { accountsStore } from "~/store";
import { Account } from "~/models/account/Account";
import cSearchForm from "~/components/common/SearchForm.vue";
import { formatDateTime } from "~/utils/date-formatter";

@Component({
  components: {
    cSearchForm,
  },
})
export default class AccountIndexPage extends Vue {
  loading: boolean = false;
  accounts: Account[] | null = null;
  rules: object = {
  };
  headers: object[] = [
    {
      text: "Id",
      align: "center",
      value: "accountId",
      sortable: false,
    },
    {
      text: "Name",
      align: "center",
      value: "name",
      sortable: false,
    },
    {
      text: "NamePronunciation",
      align: "center",
      value: "namePronunciation",
      sortable: false,
    },
    {
      text: "CreatedAt",
      align: "center",
      value: "createdAt",
      sortable: true,
    },
    {
      text: "UpdatedAt",
      align: "center",
      value: "updatedAt",
      sortable: true,
    },
    {
      text: "Operation",
      align: "center",
      value: "action",
      sortable: false,
    },
  ];

  async search() {
    this.loading = true;
    await accountsStore.readAccounts();
    this.accounts = accountsStore.accounts;
    this.loading = false;
  }

  async created() {
    this.search();
  }

  private format(epochMilli: number) {
    return formatDateTime(epochMilli);
  }
}
</script>
