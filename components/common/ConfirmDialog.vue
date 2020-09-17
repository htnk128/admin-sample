<template>
  <v-dialog v-model="dialog" max-width="290" @keydown.esc="cancel">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="ok">OK</v-btn>
        <v-btn color="grey" @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  dialog: boolean = false;
  title?: string | null = null;
  message?: string | null = null;
  resolve?: Function | null = null;
  reject?: Function | null = null;

  open(title: string, message: string) {
    this.dialog = true;
    this.title = title;
    this.message = message;

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  ok() {
    if (!!this.resolve) {
      this.resolve(true);
    }
    this.dialog = false;
  }

  cancel() {
    if (!!this.resolve) {
      this.resolve(false);
    }
    this.dialog = false;
  }
}
</script>
