IPFS is the technology, and Kubo is the software that lets your computer join the IPFS network.

Run ipfs daemon using,
```bash
ipfs daemon
```

You can check whether the daemon is running, 
```bash
curl -X POST http://127.0.0.1:5001/api/v0/version 
```

# Health check
```bash
curl http://localhost:3000/health
```


# You can upload a file using this command,
```bash 
curl -F "file=@sample.pdf" -F "owner=lahiru" http://localhost:3000/upload
```

# Get document metadata by ID (replace <id> with a real documentId from an upload response Ex:"documentId":"22f10e7e-53fc-4e3f-82d1-3fb22fcd6b48")
```bash
curl http://localhost:3000/document/<id>
```

# Download the actual file content via IPFS, save it locally
```bash
curl http://localhost:3000/document/<id>/file -o downloaded.pdf
```
