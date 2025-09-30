const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tide-together-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('project'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database setup
const dbPath = './tide_together.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profilePicture TEXT,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`);

    // Providers table
    db.run(`CREATE TABLE IF NOT EXISTS providers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      services TEXT,
      rating REAL DEFAULT 5.0,
      reviewsCount INTEGER DEFAULT 0,
      distanceMiles REAL,
      bio TEXT,
      licenses TEXT,
      certifications TEXT,
      portfolio TEXT,
      availability TEXT,
      profilePicture TEXT,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`);

    // Bookings table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      providerName TEXT NOT NULL,
      userId TEXT NOT NULL,
      userName TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      note TEXT,
      reminder BOOLEAN DEFAULT 0,
      status TEXT DEFAULT 'pending',
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (providerId) REFERENCES providers (id),
      FOREIGN KEY (userId) REFERENCES users (id)
    )`);

    // Reviews table
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      user TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      text TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (providerId) REFERENCES providers (id)
    )`);

    // Messages table
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      threadId TEXT NOT NULL,
      "from" TEXT NOT NULL,
      fromName TEXT NOT NULL,
      "to" TEXT NOT NULL,
      toName TEXT NOT NULL,
      text TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`);

    // Support requests table
    db.run(`CREATE TABLE IF NOT EXISTS support_requests (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      adminResponse TEXT,
      responseDate INTEGER,
      resolvedDate INTEGER,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`);

    // Blocked dates table
    db.run(`CREATE TABLE IF NOT EXISTS blocked_dates (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      date TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (providerId) REFERENCES providers (id)
    )`);

    // Reminders table
    db.run(`CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY,
      bookingId TEXT NOT NULL,
      userId TEXT NOT NULL,
      userName TEXT NOT NULL,
      service TEXT NOT NULL,
      providerName TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reminderDate TEXT NOT NULL,
      message TEXT NOT NULL,
      dismissed BOOLEAN DEFAULT 0,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (bookingId) REFERENCES bookings (id),
      FOREIGN KEY (userId) REFERENCES users (id)
    )`);

    console.log('Database tables initialized');
    seedDatabase();
  });
}

// Seed database with sample data
function seedDatabase() {
  // Check if data already exists
  db.get("SELECT COUNT(*) as count FROM providers", (err, row) => {
    if (err) {
      console.error('Error checking providers:', err);
      return;
    }
    
    if (row.count > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database with sample data...');
    
    // Sample providers
    const providers = [
      {
        id: 'p1',
        name: 'Ava Johnson',
        email: 'ava.johnson@crimson.ua.edu',
        password: bcrypt.hashSync('password123', 10),
        services: JSON.stringify(['Esthetician']),
        rating: 4.9,
        reviewsCount: 2,
        distanceMiles: 1.2,
        bio: 'Professional esthetician specializing in eyelash extensions, eyebrow shaping, and nail art. Licensed with 3+ years of experience.',
        licenses: JSON.stringify(['State Esthetics License', 'Mobile Service Permit']),
        certifications: JSON.stringify(['Sanitation Certified', 'Advanced Lash Extension Training', 'Nail Art Specialist']),
        portfolio: JSON.stringify([
          'https://images.unsplash.com/photo-1556228578-8fb87677aa6a?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop'
        ]),
        availability: JSON.stringify([0, 1, 2, 3, 4, 5, 6])
      },
      {
        id: 'p2',
        name: 'Marcus Lee',
        email: 'marcus.lee@crimson.ua.edu',
        password: bcrypt.hashSync('password123', 10),
        services: JSON.stringify(['Barber', 'Hairstylist']),
        rating: 4.8,
        reviewsCount: 2,
        distanceMiles: 0.8,
        bio: 'Master barber specializing in precision fades, braids, and modern cuts. 4+ years experience with mobile appointments available on campus.',
        licenses: JSON.stringify(['Cosmetology License', 'Barber License']),
        certifications: JSON.stringify(['Master Barber Certification', 'Braiding Specialist', 'Color Theory Certified']),
        portfolio: JSON.stringify([
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop'
        ]),
        availability: JSON.stringify([1, 2, 3, 4, 5])
      }
    ];

    // Insert providers
    const insertProvider = db.prepare(`INSERT INTO providers (
      id, name, email, password, services, rating, reviewsCount, distanceMiles, 
      bio, licenses, certifications, portfolio, availability
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    providers.forEach(provider => {
      insertProvider.run([
        provider.id, provider.name, provider.email, provider.password,
        provider.services, provider.rating, provider.reviewsCount, provider.distanceMiles,
        provider.bio, provider.licenses, provider.certifications, provider.portfolio, provider.availability
      ]);
    });

    // Sample reviews
    const reviews = [
      {
        id: 'r1',
        providerId: 'p1',
        user: 'Sam',
        rating: 5,
        text: 'Ava did an amazing job on my lash extensions! Super professional and clean workspace.',
        createdAt: Date.now() - 86400000 * 2
      },
      {
        id: 'r2',
        providerId: 'p2',
        user: 'Taylor',
        rating: 4,
        text: 'Marcus gave me the perfect fade. Really knows his craft and was on time.',
        createdAt: Date.now() - 86400000 * 5
      }
    ];

    const insertReview = db.prepare(`INSERT INTO reviews (id, providerId, user, rating, text, createdAt) VALUES (?, ?, ?, ?, ?, ?)`);
    reviews.forEach(review => {
      insertReview.run([review.id, review.providerId, review.user, review.rating, review.text, review.createdAt]);
    });

    // Sample support requests
    const supportRequests = [
      {
        id: 'sr1',
        email: 'student1@crimson.ua.edu',
        message: 'I\'m having trouble booking a service. The calendar shows no available providers for tomorrow.',
        status: 'pending',
        createdAt: Date.now() - 86400000 * 1
      },
      {
        id: 'sr2',
        email: 'student2@crimson.ua.edu',
        message: 'How do I become a service provider on this platform?',
        status: 'resolved',
        adminResponse: 'You can become a provider by creating a profile and selecting the services you offer. Make sure to include your licenses and certifications!',
        responseDate: Date.now() - 86400000 * 2,
        resolvedDate: Date.now() - 86400000 * 1,
        createdAt: Date.now() - 86400000 * 3
      }
    ];

    const insertSupport = db.prepare(`INSERT INTO support_requests (
      id, email, message, status, adminResponse, responseDate, resolvedDate, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    
    supportRequests.forEach(req => {
      insertSupport.run([
        req.id, req.email, req.message, req.status, 
        req.adminResponse || null, req.responseDate || null, req.resolvedDate || null, req.createdAt
      ]);
    });

    insertProvider.finalize();
    insertReview.finalize();
    insertSupport.finalize();

    console.log('Database seeded successfully');
  });
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// API Routes

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Check both users and providers tables
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, type: 'user' }, JWT_SECRET);
      return res.json({ 
        token, 
        user: { id: user.id, name: user.name, email: user.email, type: 'user' }
      });
    }

    // Check providers if not found in users
    db.get('SELECT * FROM providers WHERE email = ?', [email], (err, provider) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (provider && bcrypt.compareSync(password, provider.password)) {
        const token = jwt.sign({ id: provider.id, email: provider.email, type: 'provider' }, JWT_SECRET);
        return res.json({ 
          token, 
          user: { id: provider.id, name: provider.name, email: provider.email, type: 'provider' }
        });
      }

      res.status(401).json({ error: 'Invalid credentials' });
    });
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, type } = req.body;
  
  if (!name || !email || !password || !type) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = `${type}_${Date.now()}`;
  
  const table = type === 'provider' ? 'providers' : 'users';
  const columns = type === 'provider' 
    ? 'id, name, email, password, services, availability'
    : 'id, name, email, password';
  
  const values = type === 'provider'
    ? [id, name, email, hashedPassword, JSON.stringify([]), JSON.stringify([])]
    : [id, name, email, hashedPassword];

  db.run(`INSERT INTO ${table} (${columns}) VALUES (${values.map(() => '?').join(', ')})`, values, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      return res.status(500).json({ error: 'Registration failed' });
    }

    const token = jwt.sign({ id, email, type }, JWT_SECRET);
    res.json({ 
      token, 
      user: { id, name, email, type }
    });
  });
});

// Providers
app.get('/api/providers', (req, res) => {
  const { service, search } = req.query;
  
  let query = 'SELECT * FROM providers';
  let params = [];
  
  if (service || search) {
    const conditions = [];
    if (service) {
      conditions.push('services LIKE ?');
      params.push(`%"${service}"%`);
    }
    if (search) {
      conditions.push('(name LIKE ? OR bio LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY rating DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Parse JSON fields
    const providers = rows.map(row => ({
      ...row,
      services: JSON.parse(row.services || '[]'),
      licenses: JSON.parse(row.licenses || '[]'),
      certifications: JSON.parse(row.certifications || '[]'),
      portfolio: JSON.parse(row.portfolio || '[]'),
      availability: JSON.parse(row.availability || '[]')
    }));
    
    res.json(providers);
  });
});

app.get('/api/providers/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM providers WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    // Parse JSON fields
    const provider = {
      ...row,
      services: JSON.parse(row.services || '[]'),
      licenses: JSON.parse(row.licenses || '[]'),
      certifications: JSON.parse(row.certifications || '[]'),
      portfolio: JSON.parse(row.portfolio || '[]'),
      availability: JSON.parse(row.availability || '[]')
    };
    
    res.json(provider);
  });
});

// Bookings
app.get('/api/bookings', authenticateToken, (req, res) => {
  const { type } = req.query;
  const userId = req.user.id;
  
  let query = 'SELECT * FROM bookings WHERE ';
  let params = [];
  
  if (type === 'provider') {
    query += 'providerId = ?';
    params.push(userId);
  } else {
    query += 'userId = ?';
    params.push(userId);
  }
  
  query += ' ORDER BY createdAt DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/bookings', authenticateToken, (req, res) => {
  const { providerId, service, date, time, note, reminder } = req.body;
  const userId = req.user.id;
  const userName = req.user.name;
  
  if (!providerId || !service || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Get provider info
  db.get('SELECT name FROM providers WHERE id = ?', [providerId], (err, provider) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    const bookingId = `b_${Date.now()}`;
    const booking = {
      id: bookingId,
      providerId,
      providerName: provider.name,
      userId,
      userName,
      service,
      date,
      time,
      note: note || '',
      reminder: reminder ? 1 : 0,
      status: 'pending',
      createdAt: Date.now()
    };
    
    db.run(`INSERT INTO bookings (
      id, providerId, providerName, userId, userName, service, date, time, note, reminder, status, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      booking.id, booking.providerId, booking.providerName, booking.userId, booking.userName,
      booking.service, booking.date, booking.time, booking.note, booking.reminder, booking.status, booking.createdAt
    ], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create booking' });
      }
      
      // Create reminder if requested
      if (reminder) {
        const reminderDate = new Date(`${date}T${time}`);
        const reminderTime = new Date(reminderDate.getTime() - 24 * 60 * 60 * 1000);
        
        const reminderData = {
          id: `rem_${Date.now()}`,
          bookingId: bookingId,
          userId: userId,
          userName: userName,
          service: service,
          providerName: provider.name,
          date: date,
          time: time,
          reminderDate: reminderTime.toISOString(),
          message: `Reminder: You have a ${service} appointment with ${provider.name} tomorrow at ${time}`,
          createdAt: Date.now()
        };
        
        db.run(`INSERT INTO reminders (
          id, bookingId, userId, userName, service, providerName, date, time, reminderDate, message, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          reminderData.id, reminderData.bookingId, reminderData.userId, reminderData.userName,
          reminderData.service, reminderData.providerName, reminderData.date, reminderData.time,
          reminderData.reminderDate, reminderData.message, reminderData.createdAt
        ]);
      }
      
      res.json(booking);
    });
  });
});

// Reviews
app.get('/api/reviews/:providerId', (req, res) => {
  const { providerId } = req.params;
  
  db.all('SELECT * FROM reviews WHERE providerId = ? ORDER BY createdAt DESC', [providerId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/reviews', authenticateToken, (req, res) => {
  const { providerId, rating, text } = req.body;
  const user = req.user.name;
  
  if (!providerId || !rating || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const reviewId = `r_${Date.now()}`;
  
  db.run('INSERT INTO reviews (id, providerId, user, rating, text, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
    [reviewId, providerId, user, rating, text, Date.now()], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create review' });
    }
    
    // Update provider's review count and rating
    db.get('SELECT COUNT(*) as count, AVG(rating) as avgRating FROM reviews WHERE providerId = ?', [providerId], (err, stats) => {
      if (!err && stats) {
        db.run('UPDATE providers SET reviewsCount = ?, rating = ? WHERE id = ?', 
          [stats.count, Math.round(stats.avgRating * 10) / 10, providerId]);
      }
    });
    
    res.json({ id: reviewId, success: true });
  });
});

// Messages
app.get('/api/messages', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all(`SELECT * FROM messages WHERE "from" = ? OR "to" = ? ORDER BY createdAt DESC`, [userId, userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Group messages by thread
    const threads = {};
    rows.forEach(msg => {
      if (!threads[msg.threadId]) {
        threads[msg.threadId] = [];
      }
      threads[msg.threadId].push(msg);
    });
    
    res.json(threads);
  });
});

app.post('/api/messages', authenticateToken, (req, res) => {
  const { threadId, to, toName, text } = req.body;
  const from = req.user.id;
  const fromName = req.user.name;
  
  if (!threadId || !to || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const messageId = `m_${Date.now()}`;
  
  db.run('INSERT INTO messages (id, threadId, "from", fromName, "to", toName, text, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [messageId, threadId, from, fromName, to, toName, text, Date.now()], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to send message' });
    }
    
    res.json({ id: messageId, success: true });
  });
});

// Support requests
app.get('/api/support', (req, res) => {
  db.all('SELECT * FROM support_requests ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/support', (req, res) => {
  const { email, message } = req.body;
  
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message required' });
  }
  
  if (!email.endsWith('@crimson.ua.edu')) {
    return res.status(400).json({ error: 'Please use your Crimson email address' });
  }
  
  const requestId = `sr_${Date.now()}`;
  
  db.run('INSERT INTO support_requests (id, email, message, createdAt) VALUES (?, ?, ?, ?)', 
    [requestId, email, message, Date.now()], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to submit support request' });
    }
    
    res.json({ id: requestId, success: true });
  });
});

// Blocked dates
app.get('/api/blocked-dates', authenticateToken, (req, res) => {
  const providerId = req.user.id;
  
  db.all('SELECT * FROM blocked_dates WHERE providerId = ? ORDER BY date', [providerId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/blocked-dates', authenticateToken, (req, res) => {
  const { date } = req.body;
  const providerId = req.user.id;
  
  if (!date) {
    return res.status(400).json({ error: 'Date required' });
  }
  
  // Check if already blocked
  db.get('SELECT id FROM blocked_dates WHERE providerId = ? AND date = ?', [providerId, date], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (row) {
      // Remove the block
      db.run('DELETE FROM blocked_dates WHERE id = ?', [row.id], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to unblock date' });
        }
        res.json({ success: true, action: 'unblocked' });
      });
    } else {
      // Add the block
      const blockId = `bd_${Date.now()}`;
      db.run('INSERT INTO blocked_dates (id, providerId, date, createdAt) VALUES (?, ?, ?, ?)', 
        [blockId, providerId, date, Date.now()], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to block date' });
        }
        res.json({ success: true, action: 'blocked' });
      });
    }
  });
});

// Reminders
app.get('/api/reminders', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const now = new Date().toISOString();
  
  db.all('SELECT * FROM reminders WHERE userId = ? AND reminderDate <= ? AND dismissed = 0 ORDER BY reminderDate', 
    [userId, now], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/reminders/:id/dismiss', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('UPDATE reminders SET dismissed = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to dismiss reminder' });
    }
    res.json({ success: true });
  });
});

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'project', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Tide Together server running on http://localhost:${PORT}`);
  console.log(`Database file: ${dbPath}`);
  console.log(`SQLiteStudio: Open ${dbPath} in SQLiteStudio to view/edit data`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
