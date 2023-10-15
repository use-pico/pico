export const keywordsOf = (keywords?: string | null): string[] | undefined => {
    if (!keywords) {
        return undefined;
    }
    return keywords.split(/\s+/g).map(item => item.trim()).filter(Boolean);
};
