<template>
  <header :class="['global-header', `theme-${themeStore.theme}`,]">
    <h1>Pc</h1>

    <nav class="header-mid">
      <router-link :to="{name: 'home'}">
        <span>Home</span>
      </router-link>
      <router-link :to="{name: 'my practices'}">
        <span>Work</span>
      </router-link>
      <a href="#" style="text-decoration: line-through;">Blog</a>
      <a href="#" style="text-decoration: line-through;">Resume</a>
    </nav>

    <div class="functions">
      <Switch :change="themeStore.changeTheme" :isActive="themeStore.isDark" iconL="fi fi-rr-sun" iconR="fi fi-rr-moon"/>
      <Switch :change="langStore.changeLang" :isActive="langStore.isEnUS" textL="中" textR="Eng"/>
    </div>

    <button class="toggle-sidebar" @click="toggleSidebar">
      <i class="fi fi-rr-menu-burger"></i>
    </button>
  </header>
</template>

<script lang="ts">
import Switch from '@/components/switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'global-header',
  components: {
    Switch,
  },
  props: {
    toggleSidebar: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: () => {},
    },
  },
  setup() {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    return { themeStore, langStore };
  },
});
</script>

<style scoped lang="scss">
@forward './global-header.scss';
</style>