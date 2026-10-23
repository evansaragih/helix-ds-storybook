// Prototypes in public/prototypes are plain HTML; they load tokens from ../_shared/.
// Copy the single source (theme.css, favicon) there so the design system stays the only place tokens are edited.
import { copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url))
const out = root('public/prototypes/_shared')

mkdirSync(out, { recursive: true })
copyFileSync(root('src/styles/theme.css'), `${out}/theme.css`)
copyFileSync(root('public/favicon.svg'), `${out}/favicon.svg`)
