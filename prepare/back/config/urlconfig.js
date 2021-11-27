exports.backUrl = process.env.NODE_ENV?.trim() === 'production' ? 'https://api.tossknot.com' : 'http://localhost:3065';
exports.frontUrl = process.env.NODE_ENV?.trim() === 'production' ? 'https://tossknot.com' : 'http://localhost:3060';
