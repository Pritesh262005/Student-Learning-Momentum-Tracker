const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const User = require('./models/User');
    
    const users = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true
      },
      {
        name: 'Teacher User',
        email: 'teacher@test.com',
        password: 'teacher123',
        role: 'teacher',
        isVerified: true
      },
      {
        name: 'Student User',
        email: 'student@test.com',
        password: 'student123',
        role: 'student',
        isVerified: true
      }
    ];
    
    console.log('Creating test accounts...\n');
    
    for (const userData of users) {
      const exists = await User.findOne({ email: userData.email });
      if (!exists) {
        await User.create(userData);
        console.log(`✅ Created: ${userData.email} (${userData.role})`);
        console.log(`   Password: ${userData.password}`);
      } else {
        console.log(`⚠️  Already exists: ${userData.email}`);
      }
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Seeding complete!');
    console.log('\nYou can now login with:');
    console.log('- Admin: admin@test.com / admin123');
    console.log('- Teacher: teacher@test.com / teacher123');
    console.log('- Student: student@test.com / student123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedUsers();
