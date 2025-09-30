#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Tide Together...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✓ Node.js ${nodeVersion} detected`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  console.log('Download from: https://nodejs.org/');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✓ npm ${npmVersion} detected`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Initialize database
console.log('\n🗄️  Initializing database...');
try {
  execSync('npm run init-db', { stdio: 'inherit' });
  console.log('✓ Database initialized with sample data');
} catch (error) {
  console.error('❌ Failed to initialize database');
  process.exit(1);
}

// Check if SQLiteStudio is mentioned
console.log('\n📊 SQLiteStudio Setup:');
console.log('1. Download SQLiteStudio from: https://sqlitestudio.pl/');
console.log('2. Install and launch SQLiteStudio');
console.log('3. Click "Add Database" (green + icon)');
console.log('4. Choose "SQLite 3" as database type');
console.log(`5. Set database file path to: ${path.resolve('./tide_together.db')}`);
console.log('6. Click "OK" to connect');

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Start the server: npm start');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Use sample accounts to test the application');
console.log('\nSample accounts:');
console.log('Provider: ava.johnson@crimson.ua.edu / password123');
console.log('Provider: marcus.lee@crimson.ua.edu / password123');

console.log('\n📚 For more information, see README.md');
