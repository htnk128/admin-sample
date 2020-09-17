<template>
  <v-expansion-panels v-model="panel" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header />
      <v-expansion-panel-content>
        <v-card flat width="100%" color="transparent">
          <v-form ref="searchForm" v-model="valid">
            <slot name="body"></slot>
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn
              fab
              small
              class="mx-2"
              :disabled="!valid || syncedLoading"
              :loading="syncedLoading"
              color="primary"
              @click="submit"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "nuxt-property-decorator";

@Component
export default class SearchForm extends Vue {
  @PropSync("loading", { type: Boolean, default: false })
  syncedLoading?: boolean;

  @Prop({ type: Function, default: () => {} })
  search?: Function;

  @Prop({ type: Boolean, default: false })
  opened?: boolean = false;

  panel: number | null = this.opened ? 0 : null;
  valid: boolean = true;

  submit() {
    if (!!this.search && this.refs.searchForm.validate()) {
      this.search();
      this.panel = null;
    }
  }

  get refs(): any {
    return this.$refs;
  }
}
</script>
