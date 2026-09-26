#!/usr/bin/env bash
# PostToolUse (Edit|Write) reminder — fires only when the edited file is
# design-system source (component, theme token, or Storybook story) that the
# Helix Design System web app docs pages (packages/helix-design-system/src/app/)
# don't auto-sync from. See .claude/skills/sync-design-docs/SKILL.md.

f="$(jq -r '.tool_input.file_path // empty')"

case "$f" in
  */packages/helix-design-system/src/components/*| \
  */packages/helix-design-system/src/styles/theme.css| \
  */src/stories/components/*.stories.tsx| \
  */src/stories/foundations/*.stories.tsx)
    jq -n \
      --arg msg "Design system source changed — the Helix Design System web app docs pages may be out of sync. Consider running /sync-design-docs." \
      '{
        systemMessage: $msg,
        hookSpecificOutput: {
          hookEventName: "PostToolUse",
          additionalContext: ($msg + " (packages/helix-design-system/src/app/*Section.tsx files are hand-written and do not auto-update from component/token/story changes.)")
        }
      }'
    ;;
  *)
    exit 0
    ;;
esac
