const repository = 'hamza221/personalWebsite'
export const guestbookRepositoryUrl = `https://github.com/${repository}`

// One page is deliberately small: unauthenticated GitHub requests share an IP quota.
export async function fetchGuestbookPage(page, signal) {
  async function get(path) {
    const response = await window.fetch(`https://api.github.com/repos/${repository}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    })
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error(
          'GitHub is limiting requests. Try again later, or read the guest book on GitHub.'
        )
      }
      throw new Error('Could not load the guest book from GitHub. Please try again.')
    }
    return response.json()
  }

  const pulls = await get(
    `/pulls?state=closed&sort=created&direction=desc&per_page=10&page=${page}`
  )
  const entries = []
  for (const pull of pulls) {
    if (!pull.merged_at) continue
    const detail = await get(`/pulls/${pull.number}`)
    if (!detail.merged || detail.changed_files !== 0) continue
    // GitHub's PR commits endpoint exposes at most 250 commits. Never silently truncate a note.
    if (detail.commits > 250) {
      throw new Error(`PR #${pull.number} has too many commits to display. Read it on GitHub.`)
    }
    const messages = []
    for (let commitPage = 1; messages.length < detail.commits; commitPage++) {
      const commits = await get(`/pulls/${pull.number}/commits?per_page=100&page=${commitPage}`)
      if (!commits.length) throw new Error('GitHub returned an incomplete entry. Please try again.')
      messages.push(...commits.map((commit) => ({ sha: commit.sha, text: commit.commit.message })))
    }
    entries.push({
      number: pull.number,
      username: pull.user?.login || 'Deleted GitHub account',
      profileUrl: pull.user ? `https://github.com/${encodeURIComponent(pull.user.login)}` : null,
      avatarUrl: pull.user ? `https://avatars.githubusercontent.com/u/${pull.user.id}?s=80` : null,
      url: `${guestbookRepositoryUrl}/pull/${pull.number}`,
      createdAt: pull.created_at,
      messages,
    })
  }
  return { entries, hasMore: pulls.length === 10 }
}
