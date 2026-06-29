#!/usr/bin/env node
/**
 * Genera un hash bcrypt para configurar EDITOR_USERS en Vercel.
 *
 * Uso:
 *   node scripts/hash-password.js <contraseña>
 *
 * Luego configurar en Vercel → Settings → Environment Variables:
 *   EDITOR_USERS  = marloeditor:$2b$12$<hash generado>
 *   EDITOR_SESSION_SECRET = <cadena aleatoria larga, ej: openssl rand -hex 32>
 *
 * Formato de EDITOR_USERS: "username:bcryptHash" (cuenta única, sin comas)
 */
import bcryptjs from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Error: falta la contraseña.\nUso: node scripts/hash-password.js <contraseña>');
  process.exit(1);
}

const COST = 12; // Factor de trabajo bcrypt (~300ms en hardware moderno)
const hash = await bcryptjs.hash(password, COST);

console.log('\nHash generado (costo bcrypt: ' + COST + '):\n');
console.log(hash);
console.log('\n--- Configurar en Vercel ---');
console.log('EDITOR_USERS =', `marloeditor:${hash}`);
console.log('EDITOR_SESSION_SECRET = <cadena aleatoria — generá una con: openssl rand -hex 32>');
