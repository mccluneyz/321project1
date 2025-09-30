// API Client for Tide Together
// Replaces localStorage functionality with API calls

class APIClient {
  constructor() {
    this.baseURL = window.location.origin + '/api';
    this.token = localStorage.getItem('tt_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('tt_token', token);
    } else {
      localStorage.removeItem('tt_token');
    }
  }

  // Get current user from token
  getCurrentUser() {
    if (!this.token) return null;
    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        type: payload.type
      };
    } catch (e) {
      return null;
    }
  }

  // Make authenticated API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    this.setToken(response.token);
    return response;
  }

  async register(name, email, password, type) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password, type }
    });
    
    this.setToken(response.token);
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // Providers
  async getProviders(service = null, search = null) {
    const params = new URLSearchParams();
    if (service) params.append('service', service);
    if (search) params.append('search', search);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return await this.request(`/providers${query}`);
  }

  async getProvider(id) {
    return await this.request(`/providers/${id}`);
  }

  // Bookings
  async getBookings(type = 'user') {
    return await this.request(`/bookings?type=${type}`);
  }

  async createBooking(providerId, service, date, time, note, reminder) {
    return await this.request('/bookings', {
      method: 'POST',
      body: { providerId, service, date, time, note, reminder }
    });
  }

  // Reviews
  async getReviews(providerId) {
    return await this.request(`/reviews/${providerId}`);
  }

  async createReview(providerId, rating, text) {
    return await this.request('/reviews', {
      method: 'POST',
      body: { providerId, rating, text }
    });
  }

  // Messages
  async getMessages() {
    return await this.request('/messages');
  }

  async sendMessage(threadId, to, toName, text) {
    return await this.request('/messages', {
      method: 'POST',
      body: { threadId, to, toName, text }
    });
  }

  // Support
  async getSupportRequests() {
    return await this.request('/support');
  }

  async submitSupportRequest(email, message) {
    return await this.request('/support', {
      method: 'POST',
      body: { email, message }
    });
  }

  // Blocked Dates
  async getBlockedDates() {
    return await this.request('/blocked-dates');
  }

  async toggleDateBlock(date) {
    return await this.request('/blocked-dates', {
      method: 'POST',
      body: { date }
    });
  }

  // Reminders
  async getReminders() {
    return await this.request('/reminders');
  }

  async dismissReminder(reminderId) {
    return await this.request(`/reminders/${reminderId}/dismiss`, {
      method: 'POST'
    });
  }
}

// Create global API client instance
window.api = new APIClient();

// Note: Session management is handled by app.js using localStorage
// These functions are not overridden to maintain compatibility with existing localStorage-based session management
