import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipeData }) {
  const navigate = useNavigate();
  const { cuisine, image, name, rating, ingredients, id } = recipeData;

  return (
    <>
      <Card onClick={() => navigate(`/recipe/${id}`)}>
        <div>
          <CardHeader title={cuisine} subheader={name} />
          <CardMedia component="img" height="194" image={image} />
          <CardContent sx={{ maxHeight: 60, overflow: "hidden" }}>
            <Typography variant="body2" color="text.secondary">
              {ingredients.join(",")}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Rating
              name="size-small"
              defaultValue={2}
              value={rating}
              readOnly
              precision={0.5}
              size="small"
            />
          </CardActions>
        </div>
      </Card>
    </>
  );
}
