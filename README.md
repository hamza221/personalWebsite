# Retro portfolio

My personal website + blog + Photo gallery 

The desktop UI (windows, taskbar, Start menu, controls) is built with
[`@hamza221/wxp`](https://www.npmjs.com/package/@hamza221/wxp), a Windows XP Luna
component library licensed GPL-3.0-or-later. `src/App.vue` declares every app as an
`xp-window`; wxp owns window state, and page content mounts only while a window is open.

## Guest book

Run `npm ci` and `npm run dev`, then open **Guest book** from the desktop or Start menu.
`src/pages/GuestBook.vue` contains a native-Git signing guide and displays commit
messages from merged PRs with zero changed files. `src/utils/guestbook.js` reads
the public GitHub API without credentials. Entries use the PR author's GitHub
username/avatar, not the commit author fields, and render messages as plain text.
The old browser-local prototype notes are not read or uploaded.

## Guest book backend

The guest book uses empty Git commits as messages, submitted through pull requests.
The website reads published messages directly from GitHub; no database is required.

### Empty PR auto-merge

`.github/workflows/auto-merge-empty.yml` runs on PR creation, updates, reopening,
leaving draft mode, edits, and successful PR Build/Lint completion. It fetches the
current PR and file list from GitHub, skips drafts/closed PRs and any PR with file
changes, and merges eligible PRs with a merge commit to preserve original messages.
CI completion only considers PRs with the same source repository and head SHA.

“Empty” means zero net changed files in the PR, not an empty description or title.
The workflow checks the current revision again before merging and supplies the
verified head SHA to GitHub's merge API. A changed head cannot be merged by that run.
It never checks out PR code or executes commit messages, including for fork PRs.
The existing dependency auto-merge workflow is independent and unchanged.

Repository setup:

- Land the workflow on the default branch so its privileged events can run.
- Allow merge commits and GitHub Actions write permissions in repository settings.
- Branch protections and required checks still apply. If required checks are pending,
  the workflow waits for Build/Lint completion events and revalidates before merging.
  Failed checks do not trigger a merge; rerunning fixed CI successfully triggers a
  fresh attempt. Other policy errors remain failures and require intervention.
  It cannot bypass required approvals. Keep the `workflow_run.workflows` names in
  sync with the CI workflow names if they change.
- A merge made with `GITHUB_TOKEN` does not normally trigger another push workflow.
  The UI fetches GitHub directly, so displaying new entries needs no site rebuild.

Visitor flow, after forking, cloning their fork, and configuring authentication.
Start from an up-to-date `main` with no staged changes; use a fresh branch name:

```sh
git switch -c guestbook-hello
git commit --allow-empty -m "Love your website!" && git push -u origin HEAD
```

Open a PR from that branch to this repository. Plain `git push` does not open a
GitHub PR. There must be a new commit even though there are no changed files.
Any PR with file changes remains outside this workflow's auto-merge behavior.

### Fetching and publication

The reader scans closed PRs ten at a time, newest submission first, skips unmerged
PRs and PRs with file changes, then fetches all commit messages for eligible PRs.
“Check older PRs” scans another page, including when a page has no signatures.
Entries are deduplicated by PR number. Failed pages can be retried without losing
already loaded notes; closing the window cancels in-flight requests.

GitHub's unauthenticated API quota is shared by the visitor's IP. Rate limits and
network failures are displayed with retry and direct GitHub links. Avatars have
an initial-letter fallback. The GitHub PR commits endpoint exposes at most 250
commits; larger entries show an explicit error rather than silently truncating.
No secret, OAuth token, database, or static-feed deployment is needed.
No message-length policy or spam throttling is implemented by the merge job.
Automatic merging is not human moderation; PRs and messages are publicly readable
and remain in Git history even if later hidden from the website.

Standard GitHub-hosted Actions runners are free for public repositories, subject
to platform limits; larger runners are paid.
Source: [Actions billing](https://docs.github.com/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions).

### Alternatives: database-backed signing without GitHub accounts

Pricing checked November 4, 2026; quotas are shared with other projects on the account.

| Option | Free allowance | Tradeoff / paid starting point |
| --- | --- | --- |
| Cloudflare Workers + D1 | 100,000 API requests/day; 5 million rows read/day; 100,000 rows written/day; 5 GB total database storage | Small custom API; free quotas stop operations rather than automatically charging. Workers Paid starts at $5/month plus overages. |
| Supabase | 500 MB Postgres database, 5 GB egress, 2 active free projects | Convenient table editor and auth; free projects pause after a week of inactivity. Pro starts at $25/month. |

Sources: [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/),
[D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/),
[Supabase pricing](https://supabase.com/pricing).

### Alternative Worker + D1 data and API

- `entries`: server-generated `id`, `name`, `message`, `created_at`, and `status`
  (`pending`, `approved`, `rejected`). Enforce length/nonblank constraints server-side;
  clients cannot choose status or timestamps.
- Index `(status, created_at, id)` for stable newest-first cursor pagination.
- `GET /entries?cursor=...`: return only approved entries, 20 at a time, plus
  `nextCursor`; never expose pending/rejected messages.
- `POST /entries`: accept name, message, and anti-bot token; return `201` with
  pending status. The UI says “Awaiting approval”, not “Published”.
- Reject malformed/oversized input (`400`/`413`), throttle submissions (`429`),
  and show temporary backend/quota failures (`503`) without clearing the draft.

### Alternative Worker + D1 moderation and abuse controls

- Start with manual approval/rejection in the authenticated provider dashboard;
  no public admin endpoint or custom admin UI needed.
- Verify Turnstile tokens server-side and enforce a server-side submission rate
  limit before database writes. CORS is not an anti-spam or authentication mechanism.
- Use parameterized SQL, plain-text rendering, a small request-body limit, and an
  explicit production-origin CORS allowlist. Keep secrets only in Worker secrets.
- Do not persist raw IPs in entries. If rate limiting needs an identifier, use
  short-lived hashed identifiers with expiry; document retention and deletion.
- Display moderation/privacy expectations beside the form; provide a removal
  contact. Export the database periodically and verify restoration before launch.

### Alternative Worker + D1 implementation sequence and launch checks

1. Create a free Worker and D1 database; apply the entries schema and index.
2. Implement paginated reads and validated, rate-limited pending submissions.
3. Configure Turnstile, secrets, and allowed origins; use dashboard moderation.
4. Replace local persistence with the API. Do not upload prototype notes silently.
   Remove local-only labels only when shared storage is live.
5. Verify two browsers see approved notes, pending notes remain private, rejected
   tokens and oversized requests fail, pagination has no duplicates, and network/
   quota failures preserve drafts. Exercise approval, rejection, and removal.
6. Stay on the free plan initially; monitor quotas and export backups. Upgrade
   explicitly only when traffic warrants it.

## Asset credits

- Welcome, folder, and miscellaneous-links icons: `w2k_info.ico`, `w2k_folder_closed.ico`, and `w2k_notepad_1.ico` from [trapd00r/win95-winxp_icons](https://github.com/trapd00r/win95-winxp_icons).
- Guest-book icon: `w98_address_book.ico` from the same [retro icon collection](https://github.com/trapd00r/win95-winxp_icons/blob/728a866ad59a54fd4082dbe000e1e62e50bd90e9/icons/w98_address_book.ico).
- GitHub Invertocat: [GitHub Brand Toolkit](https://brand.github.com/foundations/logo).
- LinkedIn `[in]` logo: [LinkedIn Brand Guidelines](https://brand.linkedin.com/in-logo).
- Fennec project logo: [getfennec.app](https://getfennec.app/assets/fennec-logo.png).
