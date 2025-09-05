This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Run Project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI tools used and key prompts

AI tools used:

- Figma Make
- Cursor (can't use premium models so had to switch to VS Code)
- Github Copilot
- ChatGPT

Key Prompts:

- Create a campaign creation workflow where the user can choose campaign types and add campaign information with product url (optional) and via file upload and the form would be auto completed and after getting the generated output, the user can modify, add, and delete campaign rules, after that the user can add additional integrations then finally configure email setups, use react and tailwind css and create mock-up data.
- Make the UI as close as possible to the image, use vertical progress bar on the left side, only use 4 steps, only use 3 types for campaign type: seeding/gifting, paid promotion, and other.
- Fix missing radix ui dependencies and add use-client to client components.

## Fixes made and TODOs with more time

Fixes:

- Removed version specific imports and used the ones installed instead
- Removed undefined variables and made some of the variables nullable for the email config

TODOs:

- Remove redundant components and libraries
- Clean unused code and improve modularization
- Do input validation and better error handling
- Improve UI and make it simpler and more aligned with the Figma design
