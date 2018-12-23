# Dimiwords
18기 디미고 신입생을 위한 단어장 서비스 API 및 웹 애플리케이션입니다.

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
