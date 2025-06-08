import {
  Box,
  Chip,
  createTheme,
  Grid,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import "./App.css";
import bgCafeImg from "./assets/images/bg-cafe.jpg";
import vector from "./assets/images/vector.svg";
import CoffeeCard from "./components/CoffeeCard";
import LoadingSpinner from "./components/LoadingSpinner";
import { Scaled } from "./constants";
import dependencies from "./dependencies";
import { Coffee } from "./models/coffee";

const theme = createTheme({
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  palette: {
    text: { primary: "#fef7ef", secondary: "#4d5562" },
    background: { default: "#121315", paper: "#1c1d1f" },
  },
});

type CoffeeFilter = "all" | "available-only";

type RequestStatus = "requesting" | "success" | "failed";

function App() {
  const [displayCoffeeFilter, setDisplayCoffeeFilter] =
    useState<CoffeeFilter>("all");
  const [coffees, setCoffess] = useState<Coffee[]>([]);
  const [displayedCoffees, setDisplayedCoffees] = useState<Coffee[]>([]);
  const [requestStatus, setRequestStatus] =
    useState<RequestStatus>("requesting");

  useEffect(() => {
    dependencies.usecases.coffee
      .getCoffeeListing()
      .then((coffees) => {
        setRequestStatus("success");
        setCoffess(coffees);
      })
      .catch((error) => {
        setRequestStatus("failed");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (displayCoffeeFilter === "all") {
      setDisplayedCoffees(coffees);
    } else {
      setDisplayedCoffees(
        coffees.filter((coffee) => coffee.available === true)
      );
    }
  }, [coffees, displayCoffeeFilter]);

  const responsiveTheme = responsiveFontSizes(theme);

  const showAllCoffee = () => {
    setDisplayCoffeeFilter("all");
  };

  const showAvailableOnlyCoffee = () => {
    setDisplayCoffeeFilter("available-only");
  };

  return (
    <Box>
      <ThemeProvider theme={responsiveTheme}>
        <Box
          m={0}
          minHeight="100vh"
          minWidth="100vw"
          bgcolor="background.default"
          pb={{ xs: "90px", sm: "110px", md: "130px", lg: "150px" }}
        >
          <Box
            component="img"
            src={bgCafeImg}
            height="35vh"
            width={1}
            sx={{ objectFit: "cover" }}
            position="absolute"
            top={0}
            left={0}
          />
          <Stack
            bgcolor="background.paper"
            spacing={2}
            zIndex={3}
            position="relative"
            borderRadius="20px"
            alignItems="center"
            sx={{
              mt: { xs: "90px", sm: "110px", md: "130px", lg: "150px" },
              mx: { lg: "90px", md: "70px", sm: "50px", xs: "20px" },
              py: { md: "90px", xs: "60px" },
              px: { lg: "90px", md: "70px", sm: "50px", xs: "30px" },
            }}
          >
            <Stack spacing={1} maxWidth="500px" position="relative">
              <Box
                component="img"
                src={vector}
                position="absolute"
                top="-40px"
                right="-20px"
                width={{ xs: "200px", sm: "250px" }}
              />
              <Typography
                color="text.primary"
                fontWeight="bold"
                textAlign="center"
                sx={{
                  fontSize: {
                    md: Scaled.rem(28),
                    sm: Scaled.rem(24),
                    xs: Scaled.rem(20),
                  },
                }}
                zIndex={3}
                position="relative"
              >
                Our Collection
              </Typography>
              <Typography
                color="text.secondary"
                textAlign="center"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    md: Scaled.rem(16),
                    xs: Scaled.rem(14),
                  },
                }}
                position="relative"
                zIndex={3}
              >
                Introducing our Coffee Collection, a selection of unique coffees
                from different roast types and origins, expertly roasted in
                small batches and shipped fresh weekly.
              </Typography>
              <Stack
                pt="4px"
                direction="row"
                justifyContent="center"
                spacing={1.5}
              >
                <CoffeeFilterChip
                  label="All Products"
                  onClick={showAllCoffee}
                  isChosen={displayCoffeeFilter === "all"}
                />
                <CoffeeFilterChip
                  label="Available Now"
                  onClick={showAvailableOnlyCoffee}
                  isChosen={displayCoffeeFilter === "available-only"}
                />
              </Stack>
            </Stack>
            {requestStatus === "requesting" && (
              <Box pt={3}>
                <LoadingSpinner text="Fetching data..." />
              </Box>
            )}
            {requestStatus === "success" && coffees.length > 0 && (
              <Grid spacing={4} container>
                {displayedCoffees.map((coffee) => (
                  <Grid
                    alignItems="center"
                    key={coffee.id}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    display="flex"
                    justifyContent="center"
                  >
                    <CoffeeCard coffee={coffee} />
                  </Grid>
                ))}
              </Grid>
            )}
            {requestStatus === "failed" && (
              <Typography
                pt={3}
                color="#ED735D"
                textAlign="center"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    md: Scaled.rem(16),
                    xs: Scaled.rem(14),
                  },
                }}
              >
                Something is wrong, please try again later :(
              </Typography>
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

interface CoffeeFilterChipProps {
  label: string;
  onClick: () => void;
  isChosen: boolean;
}

const CoffeeFilterChip = ({
  label,
  onClick,
  isChosen,
}: CoffeeFilterChipProps) => {
  return (
    <Chip
      sx={{
        bgcolor: isChosen ? "#6F757C" : "transparent",
        borderRadius: "10px",
        "&:hover": {
          bgcolor: "rgba(111,117,124,0.4)",
        },
      }}
      label={label}
      onClick={onClick}
    />
  );
};

export default App;
