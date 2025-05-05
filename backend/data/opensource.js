const fetch = require("node-fetch");

const usernames = [
  "Dhruvermafz",
  "rocklimedev",
  "induseducationworld",
  "devpickyvibe",
];

const query = (username) => `
{
  user(login: "${username}") {
    pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        title
        url
        createdAt
        repository {
          nameWithOwner
          isPrivate
          isFork
          owner {
            login
          }
        }
      }
    }
  }
}
`;

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

async function fetchContributions(username) {
  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // No Authorization header needed for public data
    },
    body: JSON.stringify({ query: query(username) }),
  });

  const json = await response.json();

  if (!json.data || !json.data.user) {
    console.error(`❌ Failed to fetch for user: ${username}`);
    return [];
  }

  const prs = json.data.user.pullRequests.nodes;

  // Filter open-source only: public + not your own repo
  return prs
    .filter((pr) => !pr.repository.isPrivate)
    .map((pr) => ({
      username,
      title: pr.title,
      url: pr.url,
      repo: pr.repository.nameWithOwner,
      owner: pr.repository.owner.login,
      createdAt: pr.createdAt,
    }));
}

(async () => {
  let allContributions = [];

  for (const username of usernames) {
    console.log(`🔍 Fetching PRs for ${username}...`);
    const userPRs = await fetchContributions(username);
    allContributions.push(...userPRs);
  }

  console.log(`\n🎉 Open Source Contributions:\n`);

  allContributions.forEach((pr) => {
    console.log(`[${pr.username}] ${pr.createdAt} → ${pr.repo}`);
    console.log(`  ${pr.title}`);
    console.log(`  ${pr.url}\n`);
  });
})();
