<script setup>
import HexbinDemo10k from "@/components/HexbinDemo10k.vue"
import { watch } from "vue"

import { useData } from 'vitepress'
import { useTheme } from 'vuetify'
const { isDark } = useData()
const vuetifyTheme = useTheme()
watch(isDark, (isDark) => {
  vuetifyTheme.global.name.value = isDark ? 'dark': 'light'
}, { immediate: true })
</script>

# Feature showcase

---

<div class="d-flex flex-column" style="height: 100vh">
<HexbinDemo10k />
</div>