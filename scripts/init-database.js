const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'tide_together.db');

console.log('Initializing Tide Together database...');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    console.log('Creating tables...');
    
    // Drop existing tables (for clean initialization)
    const tables = ['reminders', 'blocked_dates', 'support_requests', 'messages', 'reviews', 'bookings', 'providers', 'users'];
    tables.forEach(table => {
      db.run(`DROP TABLE IF EXISTS ${table}`);
    });

    // Users table
    db.run(`CREATE TABLE users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profilePicture TEXT,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`, (err) => {
      if (err) console.error('Error creating users table:', err);
      else console.log('✓ Users table created');
    });

    // Providers table
    db.run(`CREATE TABLE providers (
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
    )`, (err) => {
      if (err) console.error('Error creating providers table:', err);
      else console.log('✓ Providers table created');
    });

    // Bookings table
    db.run(`CREATE TABLE bookings (
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
    )`, (err) => {
      if (err) console.error('Error creating bookings table:', err);
      else console.log('✓ Bookings table created');
    });

    // Reviews table
    db.run(`CREATE TABLE reviews (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      user TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      text TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (providerId) REFERENCES providers (id)
    )`, (err) => {
      if (err) console.error('Error creating reviews table:', err);
      else console.log('✓ Reviews table created');
    });

    // Messages table
    db.run(`CREATE TABLE messages (
      id TEXT PRIMARY KEY,
      threadId TEXT NOT NULL,
      "from" TEXT NOT NULL,
      fromName TEXT NOT NULL,
      "to" TEXT NOT NULL,
      toName TEXT NOT NULL,
      text TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`, (err) => {
      if (err) console.error('Error creating messages table:', err);
      else console.log('✓ Messages table created');
    });

    // Support requests table
    db.run(`CREATE TABLE support_requests (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      adminResponse TEXT,
      responseDate INTEGER,
      resolvedDate INTEGER,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )`, (err) => {
      if (err) console.error('Error creating support_requests table:', err);
      else console.log('✓ Support requests table created');
    });

    // Blocked dates table
    db.run(`CREATE TABLE blocked_dates (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      date TEXT NOT NULL,
      createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (providerId) REFERENCES providers (id)
    )`, (err) => {
      if (err) console.error('Error creating blocked_dates table:', err);
      else console.log('✓ Blocked dates table created');
    });

    // Reminders table
    db.run(`CREATE TABLE reminders (
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
    )`, (err) => {
      if (err) console.error('Error creating reminders table:', err);
      else console.log('✓ Reminders table created');
    });

    console.log('\nSeeding database with sample data...');
    seedDatabase();
  });
}

function seedDatabase() {
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
      bio: 'Professional esthetician specializing in eyelash extensions, eyebrow shaping, and nail art. Licensed with 3+ years of experience. I provide mobile services on campus and maintain the highest standards of hygiene and safety.',
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
      bio: 'Master barber specializing in precision fades, braids, and modern cuts. 4+ years experience with mobile appointments available on campus. I stay updated with the latest trends and techniques in men\'s and women\'s hair styling.',
      licenses: JSON.stringify(['Cosmetology License', 'Barber License']),
      certifications: JSON.stringify(['Master Barber Certification', 'Braiding Specialist', 'Color Theory Certified']),
      portfolio: JSON.stringify([
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop'
      ]),
      availability: JSON.stringify([1, 2, 3, 4, 5])
    },
    {
      id: 'p3',
      name: 'Priya Patel',
      email: 'priya.patel@crimson.ua.edu',
      password: bcrypt.hashSync('password123', 10),
      services: JSON.stringify(['Tutor']),
      rating: 5.0,
      reviewsCount: 1,
      distanceMiles: 2.4,
      bio: 'Senior Computer Science student and Teaching Assistant specializing in MIS/CS courses. Expert in data structures, algorithms, SQL, and systems programming. Available for one-on-one tutoring and group study sessions.',
      licenses: JSON.stringify([]),
      certifications: JSON.stringify(['CompTIA A+', 'Teaching Assistant Certification', 'AWS Cloud Practitioner', 'Google Data Analytics']),
      portfolio: JSON.stringify([
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
      ]),
      availability: JSON.stringify([1, 2, 3, 4, 5, 6])
    },
    {
      id: 'p4',
      name: 'Diego Ramirez',
      email: 'diego.ramirez@crimson.ua.edu',
      password: bcrypt.hashSync('password123', 10),
      services: JSON.stringify(['Joyride', 'Maintenance']),
      rating: 4.7,
      reviewsCount: 1,
      distanceMiles: 1.0,
      bio: 'Reliable transportation and handyman services around campus. I provide rides, jump starts, and basic maintenance including plumbing and electrical fixes. CPR certified with a clean driving record.',
      licenses: JSON.stringify(['Valid Driver License', 'Commercial Vehicle Permit']),
      certifications: JSON.stringify(['Basic Electrical Safety', 'CPR Certified', 'First Aid Certified', 'Automotive Repair Basics']),
      portfolio: JSON.stringify([
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop'
      ]),
      availability: JSON.stringify([0, 1, 2, 3, 4, 5, 6])
    },
    {
      id: 'p5',
      name: 'Sophia Chen',
      email: 'sophia.chen@crimson.ua.edu',
      password: bcrypt.hashSync('password123', 10),
      services: JSON.stringify(['Photography']),
      rating: 4.9,
      reviewsCount: 1,
      distanceMiles: 1.5,
      bio: 'Professional photographer specializing in portraits, events, and lifestyle photography. Available for graduation photos, parties, and special events on campus. High-quality equipment and quick turnaround times.',
      licenses: JSON.stringify(['Business Photography License']),
      certifications: JSON.stringify(['Adobe Certified Professional', 'Wedding Photography Specialist', 'Portrait Photography Master']),
      portfolio: JSON.stringify([
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1554048612-b6a99d0b4b4a?q=80&w=1200&auto=format&fit=crop'
      ]),
      availability: JSON.stringify([0, 1, 2, 3, 4, 5, 6])
    },
    {
      id: 'p6',
      name: 'Jake Thompson',
      email: 'jake.thompson@crimson.ua.edu',
      password: bcrypt.hashSync('password123', 10),
      services: JSON.stringify(['Pet Care']),
      rating: 4.8,
      reviewsCount: 1,
      distanceMiles: 0.5,
      bio: 'Animal lover and experienced pet sitter. I provide dog walking, pet sitting, and basic grooming services. Available for overnight care and have experience with various breeds and special needs pets.',
      licenses: JSON.stringify(['Pet Care Business License']),
      certifications: JSON.stringify(['Pet First Aid Certified', 'Dog Training Basics', 'Animal Behavior Specialist']),
      portfolio: JSON.stringify([
        'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop'
      ]),
      availability: JSON.stringify([0, 1, 2, 3, 4, 5, 6])
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
    ], (err) => {
      if (err) console.error('Error inserting provider:', err);
    });
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
    },
    {
      id: 'r3',
      providerId: 'p2',
      user: 'Jordan',
      rating: 5,
      text: 'Best haircut I\'ve had on campus! Marcus is incredibly skilled with braids too.',
      createdAt: Date.now() - 86400000 * 3
    },
    {
      id: 'r4',
      providerId: 'p3',
      user: 'Alex',
      rating: 5,
      text: 'Priya helped me understand data structures so much better. Great tutor!',
      createdAt: Date.now() - 86400000 * 7
    },
    {
      id: 'r5',
      providerId: 'p4',
      user: 'Casey',
      rating: 4,
      text: 'Diego helped me jump start my car and was super reliable. Great service!',
      createdAt: Date.now() - 86400000 * 4
    },
    {
      id: 'r6',
      providerId: 'p5',
      user: 'Morgan',
      rating: 5,
      text: 'Sophia took amazing graduation photos! Professional quality and quick turnaround.',
      createdAt: Date.now() - 86400000 * 6
    },
    {
      id: 'r7',
      providerId: 'p6',
      user: 'Riley',
      rating: 5,
      text: 'Jake took great care of my dog while I was away. Highly recommend!',
      createdAt: Date.now() - 86400000 * 8
    },
    {
      id: 'r8',
      providerId: 'p1',
      user: 'Blake',
      rating: 5,
      text: 'Ava\'s nail art is incredible! She\'s so creative and detail-oriented.',
      createdAt: Date.now() - 86400000 * 1
    }
  ];

  const insertReview = db.prepare(`INSERT INTO reviews (id, providerId, user, rating, text, createdAt) VALUES (?, ?, ?, ?, ?, ?)`);
  reviews.forEach(review => {
    insertReview.run([review.id, review.providerId, review.user, review.rating, review.text, review.createdAt], (err) => {
      if (err) console.error('Error inserting review:', err);
    });
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
    },
    {
      id: 'sr3',
      email: 'student3@crimson.ua.edu',
      message: 'How do I update my profile information? I can\'t find the edit button.',
      status: 'resolved',
      adminResponse: 'You can now edit your profile by going to your profile page and clicking the "Edit Profile" button. We\'ve added this feature based on your feedback!',
      responseDate: Date.now() - 86400000 * 4,
      resolvedDate: Date.now() - 86400000 * 1,
      createdAt: Date.now() - 86400000 * 5
    }
  ];

  const insertSupport = db.prepare(`INSERT INTO support_requests (
    id, email, message, status, adminResponse, responseDate, resolvedDate, createdAt
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  
  supportRequests.forEach(req => {
    insertSupport.run([
      req.id, req.email, req.message, req.status, 
      req.adminResponse || null, req.responseDate || null, req.resolvedDate || null, req.createdAt
    ], (err) => {
      if (err) console.error('Error inserting support request:', err);
    });
  });

  insertProvider.finalize();
  insertReview.finalize();
  insertSupport.finalize();

  console.log('✓ Database seeded successfully');
  console.log('\nSample accounts created:');
  console.log('Provider: ava.johnson@crimson.ua.edu / password123');
  console.log('Provider: marcus.lee@crimson.ua.edu / password123');
  console.log('Provider: priya.patel@crimson.ua.edu / password123');
  console.log('\nDatabase ready! You can now:');
  console.log('1. Start the server: npm start');
  console.log('2. Open SQLiteStudio and connect to:', dbPath);
  console.log('3. View and edit the data in the database');
  
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('\nDatabase connection closed.');
    }
  });
}
