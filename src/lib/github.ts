export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();
    return data.filter((repo: any) => !repo.fork); // Hide forks for a cleaner portfolio
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
