import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "@/components/feed/EmptyState";

describe("EmptyState", () => {
  it("renders custom title and description", () => {
    render(
      <EmptyState
        title="Custom No Results"
        description="Try searching with different keywords."
      />
    );

    expect(screen.getByText("Custom No Results")).toBeInTheDocument();
    expect(screen.getByText("Try searching with different keywords.")).toBeInTheDocument();
  });

  it("calls onReset callback when reset button is clicked", () => {
    const handleReset = jest.fn();
    render(
      <EmptyState
        title="No Results"
        onReset={handleReset}
      />
    );

    const button = screen.getByRole("button", { name: /Reset Filters/i });
    fireEvent.click(button);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
