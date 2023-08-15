// TODO: Add more common words to ignore.
const IGNORED_COMMON_WORDS = [
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "but",
  "by",
  "for",
  "if",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "over",
  "so",
  "the",
  "to",
  "up",
  "with",
];

interface MatchedKeyword {
  keyword: string;
  count: number;
}

export const generateScore = (
  resumeText: string,
  jobDescription: string,
): { score: number; matchedKeywords: MatchedKeyword[] } => {
  // TODO: Remove common unimportant english prepositions, e.g. "to", "and", etc.
  const jobDescriptionKeywords = jobDescription
    .toLocaleLowerCase()
    .replace(/\s+/g, " ") // Replace all whitespace with a single space.
    .replace(/[^a-z\ ]/gi, "") // Remove non-alphabet characters while keeping spaces.
    .split(" ")
    .filter(
      (keyword) =>
        keyword.length > 0 && !IGNORED_COMMON_WORDS.includes(keyword),
    );

  // TODO: Remove this when we use OCR to read the resume text instead.
  // Removes whitespace because pdf reader often adds whitespace in random places.
  const whitespaceRemovedResumeText = resumeText
    .toLocaleLowerCase()
    .replaceAll(/\s+/g, "");

  const matchedKeywords = jobDescriptionKeywords.reduce<Record<string, number>>(
    (matchCounts, keyword) => {
      if (!whitespaceRemovedResumeText.includes(keyword)) {
        return matchCounts;
      }

      const keywordCount = matchCounts[keyword] ? matchCounts[keyword] + 1 : 1;
      return {
        ...matchCounts,
        [keyword]: keywordCount,
      };
    },
    {},
  );

  const uniqueMatchedKeywords = Object.keys(matchedKeywords);
  const uniqueJobDescriptionKeywords = new Set(jobDescriptionKeywords);

  const score = Math.round(
    (uniqueMatchedKeywords.length / uniqueJobDescriptionKeywords.size) * 100,
  );

  // Sort matched keywords by count in descending order. For any keywords with the same count,
  // sort alphabetically.
  const sortedMatchedKeywords = Object.entries(matchedKeywords)
    .sort(([keyword1, count1], [keyword2, count2]) => {
      if (count1 === count2) {
        return keyword1.localeCompare(keyword2);
      }
      return count2 - count1;
    })
    .map(([keyword, count]) => ({ keyword, count }));

  return {
    score,
    matchedKeywords: sortedMatchedKeywords,
  };
};
