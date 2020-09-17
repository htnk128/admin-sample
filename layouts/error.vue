<template>
  <v-app dark>
    <section class="container">
      <h1 class="maintitle">Error</h1>
      <hr class="my-1" />
      <div>
        <p v-if="error.statusCode === 404">{{ pageNotFound }}</p>
        <p v-else>{{ otherError }}</p>
        <NuxtLink to="/">Home</NuxtLink>
      </div>
    </section>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  layout: "empty",
})
export default class ErrorLayout extends Vue {
  name: string = "errorLayout";
  @Prop({ type: Object, default: null })
  error?: object;

  pageNotFound: string = "404 Not Found";
  otherError: string = "An error occurred";

  head() {
    const title = "Error";
    return {
      title,
    };
  }
}
</script>
