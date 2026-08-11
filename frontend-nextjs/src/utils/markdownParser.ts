export interface ProjectSections {
    background: string;
    architecture: string;
    decisions: { title: string; description: string }[];
    results: string;
}

export function parseProjectMarkdown(content: string): ProjectSections {
    // Basic regex to split by H2 tags
    const sectionSplit = content.split(/^##\s/m).filter(Boolean);

    let background = "";
    let architecture = "";
    let decisionsStr = "";
    let results = "";

    sectionSplit.forEach((section) => {
        const lines = section.split('\n');
        const titleLine = lines[0].trim().toLowerCase();
        const body = lines.slice(1).join('\n').trim();

        if (titleLine.includes('bối cảnh') || titleLine.includes('background')) {
            background = body;
        } else if (titleLine.includes('kiến trúc') || titleLine.includes('architecture')) {
            architecture = body;
        } else if (titleLine.includes('quyết định') || titleLine.includes('decisions')) {
            decisionsStr = body;
        } else if (titleLine.includes('kết quả') || titleLine.includes('results')) {
            results = body;
        }
    });

    // Parse the decisions string into an array of { title, description }
    // Usually formatted as "**Title:** Description" or "**Title** Description"
    const decisions: { title: string; description: string }[] = [];
    const decisionMatches = decisionsStr.split(/(?=\*\*.*?\*\*)/);

    decisionMatches.forEach((match) => {
        const trimmed = match.trim();
        if (!trimmed) return;

        // Extract title inside ** **
        const titleMatch = trimmed.match(/^\*\*(.*?)\*\*(.*)/);
        if (titleMatch) {
            decisions.push({
                title: titleMatch[1].replace(':', '').trim(),
                description: titleMatch[2].replace(/^:/, '').trim()
            });
        }
    });

    return {
        background,
        architecture,
        decisions,
        results
    };
}
