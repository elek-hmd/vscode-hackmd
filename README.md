# The official HackMD Markdown VSCode extension

View [HackMD](https://hackmd.io) notes right in VSCode and edit those in your My Workspace.

![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/HackMD.vscode-hackmd)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/HackMD.vscode-hackmd)

## Features

- **New**: Edit notes in VSCode (currently limited to notes in My Workspace only)
- **New**: Preview your HackMD notes in VSCode
- **New**: Create note from editor content
- HackMD-compatible markdown rendering preview
  - We bring most HackMD markdown syntax into VSCode :tada:

### HackMD notes explorer

![sidebar](./docs/media/notes_explorer.png)

### Render code block with line numbers

![line-numbers](https://i.imgur.com/X31HZqm.png)

### MathJax, Diagrams

![mathjax](https://i.imgur.com/6vpxBbo.png)
![Sequence-diagram](https://i.imgur.com/pinXrf6.png)
![mermaid](https://i.imgur.com/M15g6It.png)

## Release Notes

[Read the full Release Note on HackMD.][release-notes]

[release-notes]: https://bit.ly/2VXRTrq

## How to activate this extension

1. Install the extension from VSCode Marketplace.
2. Generate an API token for the extension in HackMD and copy it. [Here's how][generate-api-token].
3. Activate the extension from the command palette and paste the token into VSCode when prompted.

[generate-api-token]: https://hackmd.io/@hackmd-api/developer-portal/https%3A%2F%2Fhackmd.io%2F%40hackmd-api%2Fhow-to-issue-an-api-token

## About API call limit

Operations performed by VSCode extension use API calls, which is counted against a [limit](hackmd-pricing) according to the plan you are subscribing to. You will get notification in status bar when you are about to use up the calls.

[hackmd-pricing]: https://hackmd.io/pricing

### 2.0.0

#### Added

- Adopt access token based API client. You need to create an access token on the HackMD [settings page](https://hackmd.io/settings#api)
- Add two more tree views: History and Team Notes.

#### Improvements

- Upgrade highlight.js
- Upgrade mermaid
- Upgrade more dependencies
- Adopt `react-vsc-treeview` package for implementing the new tree views. It's now easier to add features and fix bugs for the tree view.
- Reduce bundle size. We accidentally include `node_modules` in our past builds, which is not necessary.

### 1.1.1

#### Added

- HackMD Snippets command
  - Use the command: `HackMD: Create a code snippet` to create a code snippet on HackMD from the selected text range

#### Fixed

- Activity icon is not shown ([#23](https://github.com/hackmdio/vscode-hackmd/issues/23))

### 1.1.0

#### Added

- HackMD Note explorer
  - Preview your notes on HackMD
  - Create a note from editor content in VSCode

### 1.0.0

Initial Release!

#### Added

- markdown-it plugins
  - markdown-it-abbr
  - markdown-it-container
  - markdown-it-deflist
  - markdown-it-ins
  - markdown-it-mark
  - markdown-it-mathjax
  - markdown-it-sub
  - markdown-it-sup
  - checkbox (As extension dependency)
  - markdown-it-emoji
  - markdown-it-footnote
  - markdown-it-imsize
- External Graph Renderer
  - Mermaid
  - Sequence Diagram
  - Flowchart
  - Graphviz
  - abc.js
  - Mathjax
