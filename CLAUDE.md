Read and follow all instructions in AGENT.md before starting any task.
Skills are in .ai/skills/ — load them based on the task type described in AGENT.md.

## Post-Generation Quality Checks

- ALWAYS run `source ~/.nvm/nvm.sh && yarn fix` after generating or modifying code.
- Run `source ~/.nvm/nvm.sh && yarn typecheck` to verify TypeScript integrity.
