# Dimiwords

```bash
cd Server
npm install
forever start ./bin/www
cd ../Web
npm install
forever start -c "npm start" .
```
