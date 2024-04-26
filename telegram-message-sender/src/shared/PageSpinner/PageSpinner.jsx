import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const sizes = {
  lg: "5rem",
  md: "3rem",
  sm: "1rem",
  xs: "0.8rem",
  default: "2.5rem",
};

const PageSpinner = ({
  size = sizes.default,
  loadingDelayMs = 0,
  ...restProps
}) => {
  const [showComponent, setShowComponent] = useState(loadingDelayMs === 0);

  useEffect(() => {
    let timeoutId = null;
    if (loadingDelayMs > 0) {
      timeoutId = setTimeout(() => setShowComponent(true), loadingDelayMs);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loadingDelayMs]);

  return (
    showComponent && (
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        data-testid="page-spinner"
      >
        <CircularProgress size={sizes[size] || sizes.default} {...restProps} />
      </Box>
    )
  );
};

PageSpinner.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  loadingDelayMs: PropTypes.number,
};

export default PageSpinner;
