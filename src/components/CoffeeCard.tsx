import { Box, Stack, Typography } from "@mui/material";
import star from "../assets/icons/Star.svg";
import filledStar from "../assets/icons/Star_fill.svg";
import { Scaled } from "../constants";
import { Coffee } from "../models/coffee";

interface CoffeeCardProps {
  coffee: Coffee;
}

const CoffeeCard = ({ coffee }: CoffeeCardProps) => {
  return (
    <Stack maxWidth="300px" width={1} position="relative" spacing={1}>
      {coffee.popular && (
        <Typography
          bgcolor="#F6C768"
          position="absolute"
          top="10px"
          left="10px"
          fontSize="11px"
          fontWeight="bold"
          py={0.75}
          px={1.75}
          lineHeight={1}
          borderRadius="15px"
        >
          Popular
        </Typography>
      )}
      <Box
        component="img"
        mt="0 !important"
        borderRadius="15px"
        width={1}
        src={coffee.image}
      />
      <Stack alignItems="center" justifyContent="space-between" direction="row">
        <Typography color="text.primary" fontWeight="bold">
          {coffee.name}
        </Typography>
        <Typography
          bgcolor="#BEE3CC"
          borderRadius="5px"
          px={1.25}
          py={0.5}
          fontSize={Scaled.rem(12)}
          fontWeight="bold"
        >
          {coffee.price}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.75} alignItems="center" direction="row">
          <Box
            width="25px"
            component="img"
            src={coffee.votes > 0 ? filledStar : star}
          />
          {coffee.votes > 0 ? (
            <Stack spacing={0.5} direction="row" alignItems="center">
              <Typography
                fontWeight="bold"
                fontSize={Scaled.rem(14)}
                color="text.primary"
              >
                {coffee.rating}
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={Scaled.rem(14)}
                color="text.secondary"
              >
                (23 votes)
              </Typography>
            </Stack>
          ) : (
            <Typography
              fontWeight="bold"
              fontSize={Scaled.rem(14)}
              color="text.secondary"
            >
              No ratings
            </Typography>
          )}
        </Stack>
        {!coffee.available && (
          <Typography
            fontWeight="bold"
            fontSize={Scaled.rem(14)}
            color="#ED735D"
          >
            Sold out
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default CoffeeCard;
