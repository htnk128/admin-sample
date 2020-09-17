<template>
  <section class="container">
    <h1 class="maintitle">
      Account
      <span class="subtitle">add</span>
    </h1>
    <hr class="my-1" />
    <c-account-form />
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
export default class AccountAddPage extends Vue {}
</script>
