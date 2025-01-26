"use client";
import { Stack, Typography, Grid, Box, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import AuthInfo from "#/ui/auth/login";
import Logo from "#/ui/component/common/Logo";
import useResponsive from "#/Hooks/useResponsive";

export default function Page() {
  const theme = useTheme();
  const t = useTranslations();
  const SM = useResponsive("down", "sm", 0, 0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: SM ? "100vh" : "70%",
      }}
    >
      <Stack>
        <Grid
          item
          xs={12}
          justifyContent="center"
          sx={{ color: "primary.main", mt: 10, mb: 5 }}
        >
          <Logo width={159} height={60} />
        </Grid>
        <Box sx={{ px: 1 }}>
          <Typography variant="h6" textAlign="right" sx={{ mb: 3 }}>
            {t("usersSignIn")}
          </Typography>
          <AuthInfo />
        </Box>
      </Stack>
    </Box>
  );
}
