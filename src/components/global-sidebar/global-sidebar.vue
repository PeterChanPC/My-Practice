<template>
  <div :class="['sidebar-bg', 
      {'active-bg' : toggled}]"
      @click="toggleSidebar">
  </div>

  <aside :class="[
      'global-sidebar',
      `theme-${themeStore.theme}`,
      {'active' : toggled},
    ]">
    <div class="sidebar-up">
      <button class="toggle-sidebar" @click="toggleSidebar">
        <i class="fi fi-rr-menu-burger"></i>
      </button>

      <nav class="menu">
        <router-link :to="{name: 'home'}">
          <i class="fi fi-rr-home"></i>
          <span>Home</span>
        </router-link>
        <router-link :to="{name: 'my practices'}">
          <i class="fi fi-rr-list"></i>
          <span>Project</span>
        </router-link>
        <a href="#">
          <i class="fi fi-rr-home"></i>
          <span>XXX</span>
        </a>
        <a href="#">
          <i class="fi fi-rr-home"></i>
          <span>XXX</span>
        </a>
      </nav>
    </div>

    <div class="functions">
      <Switch @change="themeStore.changeTheme()" :isActive="themeStore.isDark">
        <template #left>
          <i class="fi fi-rr-sun"></i>
        </template>
        <template #right>
          <i class="fi fi-rr-moon"></i>
        </template>
      </Switch>
      <Switch @change="langStore.changeLang()" :isActive="langStore.isEnUS">
        <template #left>
          <span>中</span>
        </template>
        <template #right>
          <span>Eng</span>
        </template>
      </Switch>
    </div>
  </aside> 
</template>

<script lang="ts">
import Switch from '../switch/switch.vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLangStore } from '@/stores/lang.store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'global-sidebar',
  components: {
    Switch,
  },
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'toggle',
  ],
  setup(_, { emit }) {
    const themeStore = useThemeStore();
    const langStore = useLangStore();
    
    const toggleSidebar = () => {
      emit('toggle');
    };

    return {themeStore, langStore, toggleSidebar };
  },
});
</script>

<style scoped lang="scss">
@forward './global-sidebar.scss';
</style>