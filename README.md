# Dimiwords
18기 디미고 신입생 동기들을 위한 단어장 서비스 API 및 웹 앱입니다.

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
