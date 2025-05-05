import requests

token = "YOUR_PERSONAL_ACCESS_TOKEN"
headers = {"Authorization": f"Bearer {token}"}

query = """
{
  viewer {
    login
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
"""

response = requests.post(
    "https://api.github.com/graphql",
    json={"query": query},
    headers=headers
)

data = response.json()

# Filter for open-source PRs
user_login = data["data"]["viewer"]["login"]
pr_nodes = data["data"]["viewer"]["pullRequests"]["nodes"]

open_source_contributions = [
    pr for pr in pr_nodes
    if not pr["repository"]["isPrivate"] and pr["repository"]["owner"]["login"] != user_login
]

for pr in open_source_contributions:
    print(f"{pr['createdAt']} - {pr['title']} ({pr['url']})")
