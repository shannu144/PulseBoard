import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/store/slices/preferencesSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import feedReducer from "@/store/slices/feedSlice";
import authReducer from "@/store/slices/authSlice";
import { ContentCard } from "@/components/feed/ContentCard";
import { ContentItem } from "@/types";

const createMockStore = (initialFavorites: string[] = []) =>
  configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      feed: feedReducer,
      auth: authReducer,
    },
    preloadedState: {
      favorites: {
        items: [],
        itemIds: initialFavorites,
      },
    },
  });

describe("ContentCard", () => {
  const mockItem: ContentItem = {
    id: "card-test-1",
    type: "news",
    category: "technology",
    source: "TechCrunch",
    title: "Revolutionary Solid State Battery Tests",
    description: "New electrolytes allow 15-minute 1,000 km charges.",
    url: "https://example.com/battery",
    imageUrl: "https://images.unsplash.com/photo-1558441719-8b449c6ff670?w=500",
    publishedAt: new Date().toISOString(),
    author: "Maria Santos",
    readTimeMinutes: 4,
  };

  it("renders card headline, category badge, and source", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    expect(screen.getByText("Revolutionary Solid State Battery Tests")).toBeInTheDocument();
    expect(screen.getByText("technology")).toBeInTheDocument();
    expect(screen.getByText("TechCrunch")).toBeInTheDocument();
  });

  it("toggles favorite state on button click", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    const favoriteBtn = screen.getByLabelText(/Save to Favorites/i);
    fireEvent.click(favoriteBtn);

    const state = store.getState();
    expect(state.favorites.itemIds).toContain("card-test-1");
  });
});
