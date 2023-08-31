import { Box, LinearProgress, List, ListItem, Typography } from "@mui/material";

interface Props {
  score: number;
  matchedKeywords: { keyword: string; count: number }[];
  aiResponse: string;
}

export const ScoreResult = ({ score, matchedKeywords, aiResponse }: Props) => {
  return (
    <Box height="100%">
      <Typography component="h1" variant="h5">
        Rizzume Score
      </Typography>
      <Typography component="h2" variant="h6">
        {score} / 100
      </Typography>
      <LinearProgress variant="determinate" value={score} />
      <section className="mt-8">
        <Typography component="h2" variant="h6">
          ✨ AI Generated Suggestions:
        </Typography>
        <Typography component="p">{aiResponse}</Typography>
      </section>
      <section className="mt-8">
        <Typography component="h2" variant="h6">
          Matched keywords
        </Typography>
        <List className="pl-4">
          {matchedKeywords.map((matchedKeyword, index) => (
            <ListItem
              key={index}
              sx={{ display: "list-item", listStyleType: "circle", padding: 0 }}
            >
              {matchedKeyword.keyword} ({matchedKeyword.count} times)
            </ListItem>
          ))}
        </List>
      </section>
    </Box>
  );
};

export default ScoreResult;
