This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Pokémon Application Functionality

# Search Pokémon:

## Input Field: 
Users can search for Pokémon by entering their names in the input field.

## Search Button: 
On clicking the "Search" button, the application fetches and displays detailed information about the Pokémon, including its image, weight, height, types, stats, and description.

# Display Initial Pokémon List:

- On the initial load or when switching back to the search view, the application fetches and displays a list of the first 20 Pokémon.
- Each Pokémon in this list includes its image, name, weight, height, and types.

# View Pokémon Details:

- Users can click on any Pokémon from the initial list to view detailed information similar to the search functionality.
- Detailed information includes the Pokémon's image, name, weight, height, types, stats, and description.

# Caught Pokémon:

## Add to Caught List:
When a Pokémon is searched for or clicked from the initial list, it is automatically added to the caught Pokémon list.

## View Caught Pokémon: 
Users can switch to the caught Pokémon view to see all the Pokémon they have caught.

## Caught Pokémon Details: 
The caught Pokémon list displays each Pokémon's image, name, weight, height, and types.

# Release Pokémon:

- In the caught Pokémon view, each Pokémon card includes a "Release" button.
- On clicking the "Release" button, the Pokémon is removed from the caught list and local storage, effectively "releasing" it.

# State Management and Persistence:

- The application uses zustand state management for the Pokémon data and view switching.

# Navigation:

## View Switching: 
The application provides buttons to switch between the search view and the caught Pokémon view, allowing users to navigate between searching for Pokémon and viewing their caught Pokémon.

# User Flow
# Initial Load:

- The application fetches and displays a list of the first 20 Pokémon.
- Users see a search input, a search button, and a button to go to the caught Pokémon view.

# Search for Pokémon:

- Users enter a Pokémon's name in the search input and click the search button.
- The application fetches and displays detailed information about the searched Pokémon.
- The Pokémon is added to the caught list if not already present.

# View Caught Pokémon:

- Users can click the "Caught Pokémon" button to switch to the caught Pokémon view.
- The application displays a list of all caught Pokémon with a "Release" button for each.

# Release Pokémon:

- In the caught Pokémon view, users can click the "Release" button to remove a Pokémon from the caught list.
- The Pokémon is removed from the view and local storage.

# Switch Back to Search:
- Users can click the "Back to Search" button to return to the search view and continue searching for more Pokémon.