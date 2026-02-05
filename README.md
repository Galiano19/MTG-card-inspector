# MTG Inspector

A React + TypeScript dashboard for searching and browse for Magic: the Gathering Cards.

**Live Demo**: [Click here](https://mtg-card-inspector.vercel.app/)

## Features

- **search with autocomple**: Start typing and suggestions will appear
- **Data Updated**: as an API-driven project, data is updated every 12 hours (ScryfallAPI)
- **Responsive Design**: Mobile-first approach
- **Pricing partnership**: Option for creating a partnership program with external stores

## Tech Stack

- **Frontend**: React 18, TypeScript, NextJs
- **State Management**: TanStack Query
- **Styling**: TailwinfCSS
- **UI components**: Shadcn
- **Deployment**: Vercel

## API Management

The application uses **TanStack Query** for efficient data management:

- Fetches data from ScryfallAPI
- Updates are routed in query parameters

## Repository

Full source code and development history: [This one](https://github.com/Galiano19/MTG-card-inspector)

## Future Improvements

- **AI**: Main purpose of the project, search through thousands of card just giving the description
- **Enhance UI**: Replace bubble composition for a better UI
- **Extends search and Routing to SET**: User will be able to see all cards of a set, and search for a set directly
- **User Profile**: User will be able to save cards, and even create decks

## UI/UX Enhancements

- **Replace bubble composition**: After reconsidering, boxed (bubbled) composition of components will be replaced to a more clean setup
- **Improve search**: Stale time sometimes lead to a weird situations where clicking might not work
- **Brand Identity**: Develop consistent design system
