const core = require('@actions/core');
const github = require('@actions/github');

try {
    let issues = [];
    const repositories = core.getInput('repositories');
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    repositories.forEach(async (repository) => {

        const data = await octokit.issues.listForRepo({
            owner: repository.owner,
            repo: repository.repo,
            state: 'open',
            per_page: 100,
            labels: 'bug',
            sort: 'created',
        });

        issues = [...issues, ...data];
    });

    core.setOutput('issues', issues);
} catch (error) {
    core.setFailed(error.message);
}
