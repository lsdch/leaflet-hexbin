<script setup>
import { watch } from "vue"
import { useData, defineClientComponent } from 'vitepress'
import { useTheme } from 'vuetify'
const HexbinDemo10k = defineClientComponent(() => import("@/components/HexbinDemo10k.vue"))

const { isDark } = useData()
const vuetifyTheme = useTheme()
watch(isDark, (isDark) => {
  vuetifyTheme.global.name.value = isDark ? 'dark': 'light'
}, { immediate: true })
</script>

# Feature showcase

---

<div class="d-flex flex-column">
<HexbinDemo10k />
</div>