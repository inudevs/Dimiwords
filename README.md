# Dimiwords [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
> 언젠가 **뜯어 고쳐야** 합니다! Vue, Express 처음 시작할 때 만든 프로젝트라 코드가 많이 부족하니 참고하시게 된다면 유의해 주세요.

18기 디미고 신입생을 위한 단어장 서비스 API 및 웹 애플리케이션입니다.

# Screenshots
<img src="./images/wordbooks.png" width="800px">

# Run

```bash
cd Server
npm install
sudo forever start ./bin/www
cd ../Web
npm install
npm run-script build
sudo forever start serve.js
```

## Lint 

```bash
cd Server
standard --fix
cd ../Web
eslint --fix --ext .js,.vue src
```
