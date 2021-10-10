import { ApolloError } from "@apollo/client";
import { getLongestUrl } from "./string.utils";
import { toast } from "react-hot-toast";
import Button from "../components/shared/Button";
import React from "react";

export const handleApolloError = (error?: ApolloError) => {
  if (!error?.message) {
    return;
  }
  const errorUrl = getLongestUrl(error.message);
  toast.error(
    (t) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          wordBreak: "break-word",
        }}
      >
        {error.message}{" "}
        {errorUrl && (
          <a
            style={{
              textDecoration: "underline",
              alignSelf: "center",
              marginTop: "0.3rem",
            }}
            href={errorUrl}
            target={"_blank"}
            rel="noreferrer"
          >
            {errorUrl}
          </a>
        )}
        <Button
          style={{ alignSelf: "flex-end", marginTop: "0.3rem" }}
          onClick={() => toast.dismiss(t.id)}
        >
          Close
        </Button>
      </div>
    ),
    { duration: Number.POSITIVE_INFINITY }
  );
};
