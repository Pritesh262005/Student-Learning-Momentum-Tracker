// Setup Admin and Teacher Accounts
// Run this script after registering users through the UI

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-momentum-tracker';

async function setupAccounts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      role: String
    }));

    // Update admin account
    const adminEmail = 'admin@example.com'; // Change this to your email
    const adminResult = await User.updateOne(
      { email: adminEmail },
      { $set: { role: 'admin' } }
    );

    if (adminResult.matchedCount > 0) {
      console.log(`✅ Admin account created: ${adminEmail}`);
    } else {
      console.log(`❌ User not found: ${adminEmail}`);
      console.log('   Please register this email first through the UI');
    }

    // Update teacher account
    const teacherEmail = 'teacher@example.com'; // Change this to your email
    const teacherResult = await User.updateOne(
      { email: teacherEmail },
      { $set: { role: 'teacher' } }
    );

    if (teacherResult.matchedCount > 0) {
      console.log(`✅ Teacher account created: ${teacherEmail}`);
    } else {
      console.log(`❌ User not found: ${teacherEmail}`);
      console.log('   Please register this email first through the UI');
    }

    await mongoose.disconnect();
    console.log('\n✅ Setup complete!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

setupAccounts();
