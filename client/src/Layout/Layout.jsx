import MainContent from "./MainContent";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <NavBar sx={{ position: "absolute" }} />
        <MainContent sx={{ position: "relative" }}></MainContent>
      </Box>
    </>
  );
};

export default Layout;
