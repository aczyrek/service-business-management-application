# BookWise - Smart Appointment Scheduling System

BookWise is a modern, user-friendly appointment scheduling system built with React, TypeScript, and Supabase. It provides a seamless booking experience for both service providers and clients.

![BookWise Screenshot](https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop)

## Demo

Try out BookWise at [https://cute-stroopwafel-5a296f.netlify.app](https://cute-stroopwafel-5a296f.netlify.app)

## Features

- 📅 24/7 Online Booking
  - Easy service category selection
  - Real-time availability checking
  - Flexible scheduling options
  - Guest booking support

- 👥 User Management
  - Client profiles
  - Admin dashboard
  - Role-based access control
  - Secure authentication

- 🎨 Modern Design
  - Responsive layout
  - Dark mode support
  - Clean, intuitive interface
  - Accessible components

- 🔒 Security
  - Row Level Security (RLS)
  - Secure data handling
  - Protected routes
  - Role-based permissions

## Service Categories

BookWise supports various service categories including:

- 💇‍♂️ Barbershop Services
- 💅 Nail Care
- 🐕 Pet Grooming
- 💄 Makeup Services
- 👁️ Lashes & Brows
- 💆‍♀️ Massage Therapy
- 🏥 Physiotherapy
- ⚡ Depilation
- 🌸 Cosmetology
- 🎨 Tattoo & Piercing
- 🧘‍♀️ Spa & Wellness
- 💪 Personal Training
- 💉 Aesthetic Medicine

## Tech Stack

### Frontend
- React 18.3
- TypeScript
- Tailwind CSS
- Lucide React Icons
- React Router DOM v6
- React Hook Form
- Date-fns

### Backend
- Supabase
- PostgreSQL
- Row Level Security
- Real-time subscriptions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookwise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
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
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── VideoModal.tsx
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/             # Utility functions
│   │   ├── supabase.ts
│   │   └── countryData.ts
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Booking.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   ├── Auth.tsx
│   │   └── AdminSettings.tsx
│   ├── types/           # TypeScript definitions
│   │   └── database.ts
│   ├── App.tsx
│   └── main.tsx
├── public/             # Static assets
└── supabase/          # Supabase configurations
    └── migrations/    # Database migrations
```

## Features in Detail

### Booking System
- Category-based service selection
- Real-time availability checking
- Guest booking support
- Automated confirmation system

### User Dashboard
- Appointment management
- Booking history
- Profile customization
- Dark mode preference

### Admin Features
- Service management
- Appointment oversight
- User management
- Business settings

### Profile Management
- Personal information
- Contact details
- Appointment history
- Preferences

## Security Features

### Authentication
- Email/password authentication
- Protected routes
- Secure session management
- Role-based access

### Data Protection
- Row Level Security (RLS)
- Secure API endpoints
- Data validation
- Error handling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

For testing the application, you can use these test accounts:

- Admin Account:
  - Email: admin@bookwise.com
  - Password: admin123

- Client Account:
  - Email: client@bookwise.com
  - Password: client123

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [React](https://reactjs.org/) for the UI framework