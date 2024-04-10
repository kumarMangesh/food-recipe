import { Typography, Paper, Card, CardMedia, Box, Rating } from "@mui/material";
import { GET_RECIPE } from "../graphql/queries/recipes.query";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Recipe = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_RECIPE, {
    variables: {
      id: parseInt(id),
    },
  });
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <Paper sx={{ display: "flex" }}>
            <Card>
              <CardMedia
                component="img"
                height="350"
                image={data?.recipeByID.image}
              />
            </Card>
            <Box
              sx={{
                marginLeft: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <Typography variant="h4">{data?.recipeByID.name}</Typography>
              <Typography variant="h6">{data?.recipeByID.cuisine}</Typography>
              <Typography variant="subtitle1">
                Prepration Time {data?.recipeByID.prepTimeMinutes || "-"}{" "}
                minutes.
              </Typography>
              <Typography variant="subtitle1">
                Difficulty {data?.recipeByID.difficulty}
              </Typography>
              <Rating
                name="size-small"
                value={data?.recipeByID.rating}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography variant="caption" >
              {data?.recipeByID.ingredients.join(",")}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={0} sx={{marginTop: "40px"}}>
            <Typography variant="h5">
              Instructions
            </Typography>
            {data?.recipeByID.instructions.map((inst, index) => (
              <Typography variant="subtitle1" key={index}> - {inst}</Typography>
            ))}
          </Paper>
        </div>
      )}
    </>
  );
};

export default Recipe;
