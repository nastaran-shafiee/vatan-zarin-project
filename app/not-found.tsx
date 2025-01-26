import { Container } from "@mui/material";
import React from "react";
import ErrorContent from "#/ui/component/common/ErrorContent";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <ErrorContent />
    </Container>
  );
}
