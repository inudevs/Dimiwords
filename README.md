# Dimiwords

```bash
cd Server
npm install
forever start ./bin/www
cd ../Web
npm install
sudo forever start -c "serve -l 80" ./dist
```
