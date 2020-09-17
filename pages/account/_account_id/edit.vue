<template>
  <section class="container">
    <h1 class="maintitle">
      Account
      <span class="subtitle">edit</span>
    </h1>
    <hr class="my-1" />
    <c-account-form :account-id="this.$nuxt.$route.params.account_id" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cAccountForm from "~/components/account/AccountForm.vue";

@Component({
  components: {
    cAccountForm,
  },
})
export default class AccountEditPage extends Vue {}
</script>
