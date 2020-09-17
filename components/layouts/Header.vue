<template>
  <section>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <template v-for="menu in menus">
          <v-list-item
            v-if="!menu.lists"
            :to="menu.link"
            :key="menu.name"
            @click="menuClose"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-model="menu.active"
            v-else
            no-action
            :prepend-icon="menu.icon"
            :key="menu.name"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="list in menu.lists"
              :key="list.name"
              :to="list.link"
            >
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark app clipped-left height="56px">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class HeaderLayout extends Vue {
  drawer: boolean | null = null;
  title: string = "Admin sample";
  menus: any[] = [
    {
      name: "Home",
      icon: "mdi-home",
      link: "/",
    },
    {
      name: "Account",
      icon: "mdi-account",
      link: "/account",
    },
  ];

  menuClose() {
    this.menus.forEach((menu) => (menu.active = false));
  }
}
</script>
