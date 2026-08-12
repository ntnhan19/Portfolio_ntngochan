export interface ProjectSections {
    background: string;
    features: { title: string; description: string }[];
    contribution: string[];
    challenges: { title: string; description: string }[];
    architecture: string;
    decisions: { title: string; description: string }[];
    results: string;
}

export function parseProjectMarkdown(content: string): ProjectSections {
    // Basic regex to split by H2 tags
    const sectionSplit = content.split(/^##\s/m).filter(Boolean);

    let background = "";
    let featuresStr = "";
    let contributionStr = "";
    let challengesStr = "";
    let architecture = "";
    let decisionsStr = "";
    let results = "";

    sectionSplit.forEach((section) => {
        const lines = section.split('\n');
        const titleLine = lines[0].trim().toLowerCase();
        const body = lines.slice(1).join('\n').trim();

        if (titleLine.includes('bối cảnh') || titleLine.includes('background') || titleLine.includes('overview')) {
            background = body;
        } else if (titleLine.includes('tính năng') || titleLine.includes('features')) {
            featuresStr = body;
        } else if (titleLine.includes('đóng góp') || titleLine.includes('contribution')) {
            contributionStr = body;
        } else if (titleLine.includes('thách thức') || titleLine.includes('challenges')) {
            challengesStr = body;
        } else if (titleLine.includes('kiến trúc') || titleLine.includes('architecture')) {
            architecture = body;
        } else if (titleLine.includes('quyết định') || titleLine.includes('decisions')) {
            decisionsStr = body;
        } else if (titleLine.includes('kết quả') || titleLine.includes('results') || titleLine.includes('outcome')) {
            results = body;
        }
    });

    // Parse list of features formatted as "**Title:** Description" or "**Title** Description"
    const features: { title: string; description: string }[] = [];
    const featureMatches = featuresStr.split(/(?=^\*\*.*?\*\*)/m);
    featureMatches.forEach((match) => {
        const trimmed = match.trim();
        if (!trimmed) return;
        const titleMatch = trimmed.match(/^\*\*(.*?)\*\*([\s\S]*)/);
        if (titleMatch) {
            features.push({
                title: titleMatch[1].replace(':', '').trim(),
                description: titleMatch[2].replace(/^:/, '').trim()
            });
        }
    });

    // Parse contributions as a string array (split by lines starting with -)
    const contribution = contributionStr.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.replace(/^-/, '').trim());

    // Parse list of challenges formatted as "**Title:** Description" or "**Title** Description"
    const challenges: { title: string; description: string }[] = [];
    const challengeMatches = challengesStr.split(/(?=^\*\*.*?\*\*)/m);
    challengeMatches.forEach((match) => {
        const trimmed = match.trim();
        if (!trimmed) return;
        const titleMatch = trimmed.match(/^\*\*(.*?)\*\*([\s\S]*)/);
        if (titleMatch) {
            challenges.push({
                title: titleMatch[1].replace(':', '').trim(),
                description: titleMatch[2].replace(/^:/, '').trim()
            });
        }
    });

    // Parse the decisions string into an array of { title, description }
    // Usually formatted as "**Title:** Description" or "**Title** Description"
    const decisions: { title: string; description: string }[] = [];
    const decisionMatches = decisionsStr.split(/(?=^\*\*.*?\*\*)/m);

    decisionMatches.forEach((match) => {
        const trimmed = match.trim();
        if (!trimmed) return;

        // Extract title inside ** **
        const titleMatch = trimmed.match(/^\*\*(.*?)\*\*([\s\S]*)/);
        if (titleMatch) {
            decisions.push({
                title: titleMatch[1].replace(':', '').trim(),
                description: titleMatch[2].replace(/^:/, '').trim()
            });
        }
    });

    return {
        background,
        features,
        contribution,
        challenges,
        architecture,
        decisions,
        results
    };
}
