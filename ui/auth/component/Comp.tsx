import { styled, Box, alpha } from "@mui/material";

export const AuthBox = styled(({ ...props }: any) => <Box {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[10],
    borderRadius: "12px",
  })
);

export const TransactionMessageBox = styled(({ ...props }: any) => (
  <Box {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[10],
  borderRadius: "15px",
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const TransactionSuccessMessageBox = styled(({ ...props }: any) => (
  <Box {...props} />
))(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.success.main, 0.15)}`,
  backgroundColor: alpha(theme.palette.success.main, 0.15),
  color: theme.palette.text.primary,
  borderRadius: "15px",
  minHeight: "60vh",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
}));
