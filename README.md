# BookWise - Smart Appointment Scheduling System

BookWise is a modern, user-friendly appointment scheduling system built with React, TypeScript, and Supabase. It provides a seamless booking experience for both service providers and clients.

![BookWise Screenshot](https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop)

## Features

- 📅 24/7 Online Booking
- 👥 User Authentication & Authorization
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🎨 Modern UI/UX
- 🔒 Secure Data Management
- 👑 Admin Dashboard
- 📋 Client Management

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (Icons)
  - React Router DOM
  - React Hook Form

- **Backend:**
  - Supabase (Database & Authentication)
  - PostgreSQL
  - Row Level Security

## GitHub Setup

### Repository Setup

1. Create a new repository on GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/bookwise.git
git push -u origin main
```

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `release/*`: Release preparation

### GitHub Actions Workflow

Create `.github/workflows/ci.yml` for continuous integration:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Build
        run: npm run build
```

### Git Hooks

Using Husky for pre-commit hooks:
```bash
npx husky-init && npm install
npx husky add .husky/pre-commit "npm run lint"
```

### Issue Templates

Create `.github/ISSUE_TEMPLATE/`:
- `bug_report.md`
- `feature_request.md`
- `custom.md`

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookwise.git
cd bookwise
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
bookwise/
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── lib/            # Utility functions and configurations
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── supabase/
│   └── migrations/     # Database migrations
└── public/            # Static assets
```

## Database Schema

The application uses the following main tables:

- `profiles`: User profiles and roles
- `services`: Available services
- `appointments`: Booking records
- `client_forms`: Custom forms for appointments
- `blocked_times`: Time slots marked as unavailable

## Authentication

BookWise uses Supabase Authentication with:
- Email/Password authentication
- Role-based access control
- Secure session management

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Security

- Row Level Security (RLS) policies for all tables
- Role-based access control
- Secure authentication flow
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version numbers in package.json following [SemVer](https://semver.org/)
3. Ensure all tests pass and linting is clean
4. Get approval from at least one other developer
5. Squash commits before merging

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

## Version Control

We use [SemVer](https://semver.org/) for versioning:
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality
- PATCH version for backwards-compatible bug fixes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [React](https://reactjs.org/) for the UI framework

## Support

For support, email support@bookwise.com or open an issue in the repository.