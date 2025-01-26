"use client"; // Error components must be Client Components
import ErrorContent from "#/ui/component/common/ErrorContent";
import { Container } from "@mui/material";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Container maxWidth="md">
      <ErrorContent />
    </Container>
  );
}
