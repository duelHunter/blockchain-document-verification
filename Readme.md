# Blockchain-Based Document Verification System

A decentralized document verification platform built using **Hyperledger Fabric**, **IPFS (Kubo)**, and **Node.js**.

The system allows users to upload documents, store them in IPFS, record the document's Content Identifier (CID) on a Hyperledger Fabric blockchain, and later verify that the document has not been tampered with.

---

## Project Overview

Traditional document management systems store files on centralized servers, making them vulnerable to:

- Unauthorized modifications
- Single points of failure
- Lack of transparent audit trails
- Expensive long-term storage

This project addresses these challenges by combining:

- **IPFS** for decentralized file storage
- **Hyperledger Fabric** for immutable record keeping
- **Node.js** for backend services

---

## Architecture

```text
+------------+
|    User    |
+------------+
      |
      v
+------------------+
|  Node.js Backend |
+------------------+
      |        |
      |        |
      v        v
+----------+  +-----------+
|   IPFS   |  | Hyperledger|
|  (Kubo)  |  |   Fabric   |
+----------+  +-----------+
      |              |
      |              |
      +------CID-----+
```

### Upload Flow

```text
Document
    |
    v
Node.js API
    |
    v
Upload to IPFS
    |
    v
Generate CID
    |
    v
Store CID in Hyperledger Fabric
    |
    v
Return Document ID
```

### Verification Flow

```text
Document ID
     |
     v
Query Blockchain
     |
     v
Retrieve CID
     |
     v
Fetch File from IPFS
     |
     v
Compare Hashes
     |
     v
Verification Result
```

---

## Features

### Core Features

- Upload documents
- Store documents in IPFS
- Record document metadata on blockchain
- Verify document authenticity
- Immutable audit trail
- Content-addressed storage

### Future Features

- Document versioning
- User authentication
- Role-based access control
- Digital signatures
- Multi-organization Fabric network
- Web dashboard

---

## Technology Stack

| Component | Technology |
|------------|------------|
| Backend | Node.js |
| API Framework | Express.js |
| Blockchain | Hyperledger Fabric |
| Smart Contracts | Fabric Chaincode |
| Storage | IPFS (Kubo) |
| Database | SQLite / PostgreSQL |
| Containerization | Docker |
| Orchestration (Future) | Kubernetes |

---

## Learning Objectives

This project is designed to learn:

### Blockchain

- Hyperledger Fabric architecture
- Chaincode development
- Fabric Gateway API
- Identity management

### Distributed Storage

- IPFS
- Content Addressing
- CID generation
- Pinning

### Backend Development

- REST APIs
- File upload handling
- Express.js
- Middleware

### Security

- Cryptographic hashing
- Data integrity
- Tamper detection
- Immutable ledgers

### DevOps

- Docker
- Linux
- Networking fundamentals

---

## Repository Structure

```text
blockchain-document-verification/
│
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   └── notes/
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   └── middleware/
│
├── chaincode/
│   └── document-contract/
│
├── fabric-network/
│   ├── organizations/
│   ├── channel-artifacts/
│   └── scripts/
│
├── ipfs/
│   └── configs/
│
├── frontend/
│
├── uploads/
│
├── tests/
│
└── README.md
```

---

## Development Roadmap

### Phase 1 – IPFS Fundamentals

#### Goals

- Install Kubo
- Initialize IPFS node
- Understand CID generation
- Learn pinning

#### Topics

- IPFS daemon
- Peer-to-peer networking
- Content addressing
- Distributed hash tables (DHT)

---

### Phase 2 – Node.js Backend

#### Goals

- Build REST API
- Upload files
- Store metadata

#### Endpoints

```http
POST /upload
GET  /document/:id
```

---

### Phase 3 – IPFS Integration

#### Goals

- Upload files to IPFS
- Retrieve files using CID
- Pin documents

#### Workflow

```text
File
 |
 v
IPFS
 |
 v
CID
```

---

### Phase 4 – Hyperledger Fabric

#### Goals

- Setup Fabric network
- Create channel
- Deploy chaincode

#### Asset Example

```json
{
  "documentId": "DOC001",
  "cid": "QmXXXXX",
  "owner": "User",
  "timestamp": "2026-01-01"
}
```

---

### Phase 5 – Blockchain Integration

#### Goals

Store CID inside Fabric.

```text
Document
   |
   v
IPFS
   |
   v
CID
   |
   v
Hyperledger Fabric
```

---

### Phase 6 – Verification Engine

#### Goals

Verify whether a document has been modified.

Verification process:

1. Retrieve CID from blockchain
2. Fetch document from IPFS
3. Compute hash
4. Compare hashes
5. Return result

---

### Phase 7 – User Interface

#### Pages

##### Upload Page

```text
Upload Document
```

##### Verification Page

```text
Enter Document ID
```

##### Audit Page

```text
View Document History
```

---

## API Design

### Upload Document

```http
POST /api/documents/upload
```

Response:

```json
{
  "documentId": "DOC001",
  "cid": "QmXXXXX"
}
```

---

### Verify Document

```http
POST /api/documents/verify
```

Response:

```json
{
  "verified": true
}
```

---

### Get Document Details

```http
GET /api/documents/:id
```

Response:

```json
{
  "documentId": "DOC001",
  "cid": "QmXXXXX",
  "owner": "User"
}
```

---

## Smart Contract Functions

### CreateDocument

```javascript
CreateDocument(
    documentId,
    cid,
    owner
)
```

Creates a new blockchain record.

---

### QueryDocument

```javascript
QueryDocument(
    documentId
)
```

Retrieves document metadata.

---

### GetDocumentHistory

```javascript
GetDocumentHistory(
    documentId
)
```

Returns blockchain history.

---

## Security Considerations

### Integrity

Documents are identified using content hashes.

Any modification changes the CID.

### Auditability

Every transaction is recorded on the blockchain.

### Traceability

Each document can be traced back to:

- Creator
- Timestamp
- CID
- Transaction history

---

## Future Improvements

### Authentication

- JWT
- OAuth2
- Fabric identities

### Digital Signatures

- RSA
- ECDSA

### Multi-Organization Network

```text
University
     |
Government
     |
Company
```

### Cloud Deployment

- Docker
- Kubernetes
- CI/CD

---

## References

### Hyperledger Fabric

https://hyperledger-fabric.readthedocs.io

### IPFS

https://docs.ipfs.tech

### Kubo

https://github.com/ipfs/kubo

---

## Project Goal

Build a real-world decentralized document verification system while learning:

- Linux
- Networking
- Docker
- IPFS
- Hyperledger Fabric
- REST APIs
- Blockchain Development
- Distributed Systems

This repository serves as both a learning journey and a practical implementation of decentralized document verification.