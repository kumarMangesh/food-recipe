import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Box, Pagination, Skeleton, Card } from "@mui/material";
import { GET_RECIPES } from "../graphql/queries/recipes.query";

import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";

const filterStructure = {
  mealType: {
    type: "Select",
    placeholder: "Meal Type",
    initValue: null,
    value: "",
    options: [
      { label: "Lunch", value: "Lunch" },
      { label: "Dinner", value: "Dinner" },
      { label: "Snack", value: "Snack" },
      { label: "Dessert", value: "Dessert" },
    ],
  },
  difficulty: {
    type: "Select",
    placeholder: "Difficulty",
    initValue: "",
    value: "",
    options: [
      { label: "Easy", value: "easy" },
      { label: "Hard", value: "hard" },
    ],
  },
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(filterStructure);
  const { loading, data } = useQuery(GET_RECIPES, {
    variables: {
      limit: 10,
      page,
    },
  });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (e, value, filterKey) => {
    setFilters({
      ...filters,
      [filterKey]: { ...filters[filterKey], value: value.props.value },
    });
  };

  return (
    <>
      <Filters filterState={filters} handleFilterChange={handleFilterChange} />
      {loading ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(new Array(10)).map((recipe, key) => (
            <Grid item xs={12} sm={4} md={3} key={key}>
              <Box>
                <Card sx={{ maxWidth: 345 }}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data?.recipes.recipes.map((recipe, key) => (
            <Grid item xs={12} sm={4} md={3} key={key}>
              <Box>
                <RecipeCard recipeData={recipe} loading={loading} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Pagination
          count={data?.recipes.totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default HomePage;
