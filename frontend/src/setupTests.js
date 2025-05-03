import '@testing-library/jest-dom';

// Polyfill TextEncoder and TextDecoder for Jest environment
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
