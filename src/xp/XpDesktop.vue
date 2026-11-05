<script setup>
import '@hamza221/wxp'
import '@hamza221/wxp/styles.css'
import { reactive } from 'vue'
import Clock from './components/Clock.vue'
import QuickLinks from './components/QuickLinks.vue'
import Welcome from './pages/Welcome.vue'
import Contact from './pages/Contact.vue'
import ComingSoon from './pages/ComingSoon.vue'
import Resume from '@/pages/Resume.vue'
import Experiments from './pages/Experiments.vue'
import Projects from './pages/Projects.vue'
import MiscLinks from './pages/MiscLinks.vue'
import Snake from './pages/Snake.vue'
import GuestBook from './pages/GuestBook.vue'
import Settings from '@/pages/Settings.vue'
import welcomeIcon from '@/assets/welcome.ico'
import contactIcon from '@/assets/contact.png'
import internetIcon from '@/assets/internet.png'
import photographyIcon from '@/assets/photgraphy.png'
import resumeIcon from '@/assets/resume.png'
import experimentsIcon from '@/assets/experiments.ico'
import miscLinksIcon from '@/assets/misc-links.ico'
import guestbookIcon from '@/assets/guestbook.ico'
import settingsIcon from '@/assets/settings.svg'
import { windowId } from './desktop'
import { playAppClick } from '@/utils/uiSounds'

// x/y/w/h seed the initial geometry; wxp owns position, size, and state afterwards.
const apps = [
  {
    name: 'welcome',
    title: 'Welcome',
    label: 'Welcome',
    icon: welcomeIcon,
    component: Welcome,
    open: true,
    x: '300px',
    y: '120px',
    w: '460px',
    h: '340px',
  },
  {
    name: 'contact',
    title: 'Contact',
    label: 'Contact',
    icon: contactIcon,
    component: Contact,
    x: '180px',
    y: '90px',
  },
  {
    name: 'blog',
    title: 'Blog',
    label: 'Blog',
    icon: internetIcon,
    component: ComingSoon,
    props: { kind: 'blog', title: 'The blog', icon: '✍️' },
    x: '200px',
    y: '70px',
  },
  {
    name: 'photography',
    title: 'Photography',
    label: 'Photography',
    icon: photographyIcon,
    component: ComingSoon,
    props: { kind: 'photography', title: 'Photography', icon: '📷' },
    x: '220px',
    y: '120px',
  },
  {
    name: 'resume',
    title: 'Résumé',
    label: 'Résumé',
    icon: resumeIcon,
    component: Resume,
    x: '230px',
    y: '40px',
    w: '60%',
    h: '80%',
  },
  {
    name: 'experiments',
    title: 'Experiments',
    label: 'Experiments',
    icon: experimentsIcon,
    component: Experiments,
    x: '260px',
    y: '120px',
  },
  {
    name: 'projects',
    title: 'Projects',
    label: 'Projects',
    icon: experimentsIcon,
    component: Projects,
    x: '300px',
    y: '100px',
  },
  {
    name: 'misc-links',
    title: 'MISC_LINKS.TXT - Notepad',
    label: 'Misc. Links',
    icon: miscLinksIcon,
    component: MiscLinks,
    x: '340px',
    y: '130px',
  },
  {
    name: 'snake',
    title: 'Snake',
    label: 'Snake',
    component: Snake,
    x: '180px',
    y: '30px',
    w: '440px',
    h: '580px',
  },
  {
    name: 'guestbook',
    title: 'Guest book',
    label: 'Guest book',
    icon: guestbookIcon,
    component: GuestBook,
    x: '240px',
    y: '60px',
    h: '75%',
  },
  {
    name: 'settings',
    title: 'Settings',
    label: 'Settings',
    icon: settingsIcon,
    component: Settings,
    x: '280px',
    y: '100px',
    w: '380px',
    h: '280px',
  },
]

// Content is mounted only while a window is not closed, so closing stops Snake's
// loop and cancels Guest book requests, as before.
const mounted = reactive(new Set(apps.filter((app) => app.open).map((app) => app.name)))

const onStateChange = ({ detail }) => {
  const name = detail.window.id.replace(/^app-/, '')
  if (detail.state === 'closed') mounted.delete(name)
  else mounted.add(name)
}

const geometry = (app) => ({
  '--x': app.x,
  '--y': app.y,
  '--w': app.w || '50%',
  '--h': app.h || '55%',
})
</script>

<template>
  <div class="xp">
    <xp-desktop
      class="desktop"
      aria-label="Hamza Mahjoubi's desktop"
      @xp-window-statechange="onStateChange"
      @xp-desktop-activate="playAppClick"
    >
      <nav class="xp-desktop-icons" aria-label="Desktop applications">
        <button
          v-for="app in apps"
          :key="app.name"
          class="xp-desktop-icon"
          type="button"
          :data-window="windowId(app.name)"
        >
          <img v-if="app.icon" :src="app.icon" alt="" />
          <span v-else class="snake-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span>{{ app.label }}</span>
        </button>
      </nav>

      <xp-window
        v-for="app in apps"
        :id="windowId(app.name)"
        :key="app.name"
        class="app-window"
        :title="app.title"
        :data-state="app.open ? 'normal' : 'closed'"
        :hidden="!app.open"
        :style="geometry(app)"
      >
        <!-- Single stable child: wxp moves it into the window body, Vue patches inside it. -->
        <div class="app-content">
          <component :is="app.component" v-if="mounted.has(app.name)" v-bind="app.props" />
        </div>
      </xp-window>

      <xp-taskbar user="Hamza Mahjoubi">
        <a href="https://github.com/hamza221" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a
          href="https://www.linkedin.com/in/hamza--mahjoubi/"
          target="_blank"
          rel="noopener noreferrer"
          >LinkedIn</a
        >
        <a href="mailto:contact@hamzamahjoubi.com">E-mail</a>
      </xp-taskbar>

      <div class="tray">
        <QuickLinks />
        <Clock />
      </div>
    </xp-desktop>
  </div>
</template>

<style>
.xp {
  /* Luna accent used by page headings/links; wxp supplies the rest via .xp tokens. */
  --blue: #0054e3;
  height: 100%;
}

.xp xp-desktop.desktop {
  height: 100dvh;
  /* Original sky-and-hill drawing; no Microsoft wallpaper is bundled. */
  background:
    radial-gradient(140% 55% at 30% 100%, #5fae3a 0 45%, #3f8f24 60%, transparent 61%),
    radial-gradient(120% 45% at 85% 100%, #4a9b2c 0 50%, transparent 51%),
    linear-gradient(#2a6fd6, #5c9be8 45%, #a9cdf2 70%, #d4e6f7);
}

.desktop .xp-desktop-icons {
  position: absolute;
  inset: 0 auto var(--xp-taskbar-height, 32px) 0;
  flex-wrap: wrap;
  align-content: flex-start;
}

.xp xp-desktop > xp-window.app-window {
  left: var(--x);
  top: var(--y);
  width: var(--w);
  height: var(--h);
}

.app-window > .xp-window-body {
  padding: 0;
}

.app-content {
  height: 100%;
  font-size: 13px;
}

.desktop .xp-task-buttons {
  margin-right: 128px;
}

.tray {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px 0 8px;
  border-left: 1px solid #1042af;
  background: linear-gradient(#0c59b9, #139ee9 6%, #18b9ed 12%, #0f8fdd 70%, #0b70d0);
  box-shadow: inset 1px 0 1px #18bbff;
  color: white;
}

.snake-icon {
  display: grid;
  grid-template-columns: repeat(4, 8px);
  grid-template-rows: repeat(4, 8px);
  width: 32px;
  height: 32px;
}
.snake-icon i {
  background: #57c93b;
  border: 1px solid #0a5308;
}
.snake-icon i:nth-child(1) {
  grid-area: 1 / 1;
}
.snake-icon i:nth-child(2) {
  grid-area: 2 / 1;
}
.snake-icon i:nth-child(3) {
  grid-area: 3 / 1;
}
.snake-icon i:nth-child(4) {
  grid-area: 3 / 2;
  box-shadow:
    8px 0 #57c93b,
    16px 0 #57c93b;
}

@media (max-width: 720px) {
  .desktop .xp-desktop-icons {
    flex-direction: row;
    inset: 0 0 auto 0;
  }
  .xp xp-desktop > xp-window.app-window {
    left: 4px;
    top: 4px;
    width: calc(100% - 8px);
    height: calc(100% - var(--xp-taskbar-height, 32px) - 8px);
  }
}
</style>
