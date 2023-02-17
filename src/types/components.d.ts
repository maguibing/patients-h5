import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'

declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
  }
}
