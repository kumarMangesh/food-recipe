import { Box, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import router from "../routes";

const MainContent = () => {
  return (
    <>
      <Toolbar />
      <Box
        component="main"
        padding={5}
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100%px)` },
        }}
      >
        <Routes>
          {router.map(({ path, element }) => (
            <Route path={path} key={path} element={element} />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default MainContent;
