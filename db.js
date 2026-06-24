const Database = require('better-sqlite3');

const db = new Database('documents.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS documents (
    documentId TEXT PRIMARY KEY,
    cid TEXT,
    owner TEXT,
    filename TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )
`);

function insertDocument({ documentId, cid, owner, filename, timestamp }) {
  const stmt = db.prepare(`
    INSERT INTO documents (documentId, cid, owner, filename, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(documentId, cid, owner, filename, timestamp);
}

function getDocumentById(documentId) {
  const stmt = db.prepare('SELECT * FROM documents WHERE documentId = ?');
  return stmt.get(documentId);
}

module.exports = { insertDocument, getDocumentById };
