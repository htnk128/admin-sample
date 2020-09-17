<template>
  <section class="container">
    <h1 class="maintitle">Home</h1>
    <hr class="my-1" />
    <v-layout column justify-center>
      <v-flex xs12 sm8 md6>
        <v-row dense>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>Situation</v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col> <v-icon>mdi-account</v-icon>account count </v-col>
                  <v-col>
                    <v-chip class="ma-2" color="primary" text-color="white">
                      {{ accounts.length }} accounts
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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

@Component
export default class IndexPage extends Vue {
  accounts: Account[] = [];

  async created() {
    await accountsStore.readAccounts();
    this.accounts = accountsStore.accounts;
  }
}
</script>
