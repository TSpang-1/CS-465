const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string
const connect = () => {
    setTimeout(() => {
        mongoose.connect(dbURI).catch(err => {
            console.error('MongoDB connection failed:', err);
        });
    }, 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific listener
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Configure graceful shutdown
const gracefulShutdown = async (msg) => {
    try {
        await mongoose.connection.close();
        console.log(`Mongoose disconnected through ${msg}`);
    } catch (err) {
        console.error('Error disconnecting MongoDB:', err);
    }
};

// Shutdown invoked by nodemon restart
process.once('SIGUSR2', async () => {
    await gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// Shutdown invoked by app termination
process.once('SIGINT', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

// Shutdown invoked by container termination
process.once('SIGTERM', async () => {
    await gracefulShutdown('app shutdown');
    process.exit(0);
});

// Make initial connection to database
connect();

// Import Mongoose schema
require('./travlr');

module.exports = mongoose;
