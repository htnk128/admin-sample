<template>
  <section>
    <v-footer dark app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </section>
</template>

<style lang="scss" scoped>
footer {
  span {
    font-size: $font-size-small;
  }
}
</style>
