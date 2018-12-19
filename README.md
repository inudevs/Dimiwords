# Dimiwords
18기 디미고 신입생 동기들을 위한 단어장 앱이애오

# Run

```bash
cd Server
npm install
forever start ./bin/www
cd ../Web
npm install
npm run-script build
sudo forever start -c "serve -l 80" ./dist
```
