# Tide Together - Student Service Swap Platform

A Node.js web application with SQLite database for connecting students with service providers on campus.

## Features

- **User Authentication**: Separate accounts for users and providers
- **Service Discovery**: Browse and search for available services
- **Booking System**: Request and manage service appointments
- **Messaging**: Direct communication between users and providers
- **Reviews & Ratings**: Rate and review service providers
- **Calendar Management**: Block unavailable dates
- **Reminders**: Automatic appointment reminders
- **Admin Support**: Support ticket system

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite with SQLiteStudio
- **Authentication**: JWT tokens
- **Frontend**: HTML, CSS, JavaScript (SPA)
- **Security**: bcrypt password hashing, rate limiting

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Database

```bash
npm run init-db
```

This will create the SQLite database file (`tide_together.db`) with sample data.

### 3. Start the Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

### 4. Development Mode

For development with auto-restart:

```bash
npm run dev
```

## SQLiteStudio Setup

### Download SQLiteStudio
1. Go to [SQLiteStudio website](https://sqlitestudio.pl/)
2. Download and install SQLiteStudio
3. Launch SQLiteStudio

### Connect to Database
1. Click "Add Database" (green + icon)
2. Choose "SQLite 3" as database type
3. Set database file path to: `./tide_together.db`
4. Click "OK" to connect

### Database Schema

The database contains the following tables:

- **users**: Regular user accounts
- **providers**: Service provider accounts
- **bookings**: Service booking requests
- **reviews**: User reviews of providers
- **messages**: Direct messages between users
- **support_requests**: Support tickets
- **blocked_dates**: Provider unavailable dates
- **reminders**: Appointment reminders

## Sample Accounts

After running `npm run init-db`, you can use these test accounts:

### Providers
- **Ava Johnson** (Esthetician): `ava.johnson@crimson.ua.edu` / `password123`
- **Marcus Lee** (Barber): `marcus.lee@crimson.ua.edu` / `password123`
- **Priya Patel** (Tutor): `priya.patel@crimson.ua.edu` / `password123`
- **Diego Ramirez** (Joyride/Maintenance): `diego.ramirez@crimson.ua.edu` / `password123`
- **Sophia Chen** (Photography): `sophia.chen@crimson.ua.edu` / `password123`
- **Jake Thompson** (Pet Care): `jake.thompson@crimson.ua.edu` / `password123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Providers
- `GET /api/providers` - List all providers (with optional filtering)
- `GET /api/providers/:id` - Get specific provider details

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking

### Reviews
- `GET /api/reviews/:providerId` - Get provider reviews
- `POST /api/reviews` - Create new review

### Messages
- `GET /api/messages` - Get user's messages
- `POST /api/messages` - Send message

### Support
- `GET /api/support` - Get support requests (admin)
- `POST /api/support` - Submit support request

### Blocked Dates
- `GET /api/blocked-dates` - Get provider's blocked dates
- `POST /api/blocked-dates` - Toggle date block

### Reminders
- `GET /api/reminders` - Get active reminders
- `POST /api/reminders/:id/dismiss` - Dismiss reminder

## Environment Variables

Create a `.env` file for configuration:

```env
PORT=3000
JWT_SECRET=your-secret-key-here
```

## Database Management

### View Data in SQLiteStudio
1. Open SQLiteStudio
2. Connect to `tide_together.db`
3. Browse tables and data
4. Run custom SQL queries
5. Export/import data

### Reset Database
To reset the database with fresh sample data:

```bash
rm tide_together.db
npm run init-db
```

### Backup Database
```bash
cp tide_together.db tide_together_backup.db
```

## Project Structure

```
tide-together/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── tide_together.db       # SQLite database (created after init)
├── project/               # Frontend files
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── scripts/
│   └── init-database.js   # Database initialization
└── README.md
```

## Development Notes

- The frontend is a Single Page Application (SPA)
- All data operations go through the REST API
- JWT tokens are used for authentication
- Passwords are hashed with bcrypt
- Rate limiting is implemented for API endpoints
- CORS is enabled for cross-origin requests

## Troubleshooting

### Database Connection Issues
- Ensure SQLite3 is properly installed
- Check file permissions for database file
- Verify database path is correct

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm start
```

### Module Not Found Errors
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details