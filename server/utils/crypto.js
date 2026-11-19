// utils/crypto.js
// Encryption and decryption utility for securing sensitive tokens (such as GitHub OAuth access tokens) at rest in MongoDB.
// Uses AES-256-GCM with authenticated tags and initialization vectors.

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 16 bytes for AES-GCM IV

/**
 * Derives a consistent 32-byte key from environment variables.
 * Enforces server/.env configuration with zero hardcoded secret fallbacks.
 */
function getEncryptionKey() {
  const secret = (process.env.ENCRYPTION_KEY || '').trim();
  if (!secret) {
    const fallback = (process.env.JWT_SECRET || '').trim();
    if (!fallback) {
      throw new Error(
        'Fatal Security Error: ENCRYPTION_KEY must be configured in server/.env. Hardcoded fallback keys are strictly prohibited.'
      );
    }
    return crypto.createHash('sha256').update(fallback).digest();
  }
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypt a plaintext string (e.g. GitHub OAuth access token)
 * Returns a colon-delimited string: ivHex:authTagHex:encryptedHex
 *
 * @param {string} text - Plaintext to encrypt
 * @returns {string} - Encrypted string safe for storage
 */
function encrypt(text) {
  if (!text || typeof text !== 'string') return '';
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypt an encrypted string (ivHex:authTagHex:encryptedHex) back to plaintext.
 *
 * @param {string} cipherText - Encrypted string
 * @returns {string} - Decrypted plaintext string
 */
function decrypt(cipherText) {
  if (!cipherText || typeof cipherText !== 'string') return '';
  const parts = cipherText.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted payload format.');
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = {
  encrypt,
  decrypt
};
