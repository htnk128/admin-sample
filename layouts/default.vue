<template>
  <v-app dark>
    <c-header />
    <c-main />
    <c-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cHeader from "~/components/layouts/Header.vue";
import cMain from "~/components/layouts/Main.vue";
import cFooter from "~/components/layouts/Footer.vue";

@Component({
  components: {
    cHeader,
    cMain,
    cFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>
