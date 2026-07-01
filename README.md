# Wobb Influencer Search Dashboard

A modern influencer search dashboard built using React, TypeScript, Vite, Tailwind CSS and Zustand.

## Live Demo

https://wobb-vibe-coder-assignment-liard.vercel.app/

## GitHub Repository

https://github.com/alviafatima/wobb-vibe-coder-assignment



## Features

- Search creators by username or full name
- Filter creators by Instagram, YouTube and TikTok
- Responsive modern UI
- Analytics Dashboard
- Profile Detail page
- Add creators to shortlist
- Remove creators from shortlist
- Persistent shortlist using Zustand
- Empty search state
- Skeleton loading state
- Platform-aware navigation
- Dynamic profile loading
- Responsive design



## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- React Hot Toast
- Lucide React



## Improvements Made

### UI/UX

- Redesigned dashboard
- Modern cards
- Improved spacing
- Better typography
- Responsive layout
- Empty search screen
- Skeleton loading
- Better profile details page

### Functionality

- Fixed routing bugs
- Fixed profile loading
- Fixed platform switching
- Fixed search functionality
- Persistent shortlist
- Prevent duplicate shortlist entries
- Remove from shortlist
- Analytics updates in real time

### Code Quality

- Reusable components
- Improved TypeScript types
- Cleaner project structure
- Better utility functions
- Zustand state management

### Performance

- Dynamic JSON imports
- Reduced unnecessary renders
- Optimized filtering
- Better state management



## Libraries Added

- Zustand
- Lucide React
- React Hot Toast


## Assumptions

- Influencer data is loaded from local JSON files.
- Analytics are calculated using currently visible creators.
- LocalStorage is used for shortlist persistence.



## Trade-offs

- No backend integration.
- Static dataset.
- Analytics are client-side only.



## Future Improvements

- Backend API integration
- Pagination
- Infinite scrolling
- Sorting
- Advanced filters
- Charts
- Authentication
- Unit tests
- Dark mode


## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```