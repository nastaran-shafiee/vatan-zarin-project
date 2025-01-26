"use client";
import { Container } from "@mui/material";
import React from "react";
import Courses from "./courses/page";

export default function Page() {
  return (
    <>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Courses />
      </Container>
    </>
  );
}
