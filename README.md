
# Muhammad Mahathir - Portfolio Website

A modern, responsive portfolio website showcasing my expertise as a Full Stack Developer and Data Scientist.

## About

This portfolio website highlights my professional journey, skills, and projects in:
- Frontend Development (React, Vue.js, TypeScript)
- Backend Development (Golang, Node.js, APIs)
- Data Science (Machine Learning, Analytics, Insights)

## Features

- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Dynamic Content**: Admin panel for easy content management
- **Blog System**: Share insights and technical articles
- **Project Showcase**: Detailed project presentations
- **Booking System**: Integrated calendar for consultations
- **Contact Forms**: Easy communication channels

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: TanStack Query
- **Routing**: React Router
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your Supabase credentials to the `.env.local` file.

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view the website.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

This project can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Features Overview

### Admin Panel
- Content management system
- Project portfolio management
- Blog post creation and editing
- Service offerings management
- Experience and education tracking

### Public Features
- Professional portfolio showcase
- Interactive project galleries
- Technical blog with search
- Contact and booking system
- Responsive design across all devices

## Contact

**Muhammad Mahathir**
- Full Stack Developer & Data Scientist
- Specializing in Vue.js, Golang, and Machine Learning

For inquiries about collaboration or consultation, please use the contact form on the website.

## License

This project is private and proprietary. All rights reserved.
