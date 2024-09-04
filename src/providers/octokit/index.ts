import { Octokit } from '@octokit/rest';

export const getRepoStatus = async (owner: string, repo: string): Promise<string> => {
    const octokit = new Octokit({
        auth: import.meta.env.GITHUB_TOKEN,
    });

    try {
        const { data } = await octokit.repos.get({
            owner,
            repo,
        });
        return data.private ? "Private" : "Active";
    } catch (error) {
        console.error('Error fetching repository information:', error);
        throw error;
    }
};

