// src/lib/mockAuth.js
const users = [
  {
    email: 'test@example.com',
    password: 'password123',
    userData: {
      id: 'user-1',
      name: 'Test User'
    }
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    userData: {
      id: 'user-2',
      name: 'Admin User',
      role: 'admin'
    }
  }
];

export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => 
        u.email === email && u.password === password
      );
      
      if (user) {
        resolve({
          token: `mock-token-${user.userData.id}`,
          ...user.userData
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};