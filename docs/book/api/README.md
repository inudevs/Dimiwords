# API

[디미워드(Dimiwords)](https://github.com/CIVAR-DIMIGO/Dimiwords) API 도큐먼테이션입니다.

하위 목차를 참고하세요.

## 사용자 계정

### [사용자 계정 인증](./account/auth.md)
디미워드 사용자 계정 인증을 이용해서 사용자 액세스 토큰을 발급하고, 파기합니다.

- [로그인](./account/auth.md#login)
- [로그아웃](./account/auth.md#logout)

### [사용자 계정 생성](./account/join.md)
새로운 디미워드 사용자 계정을 생성합니다.

## 단어
디미워드 단어 오브젝트를 관리합니다.

### [단어 생성](./words/new.md)
새로운 디미워드 단어를 생성합니다.
  
### [단어 조회](./words/view.md)
디미워드 단어를 조회합니다.

- [단어 목록](./words/view.md#all-words): 모든 사용자가 생성한 단어 목록을 최신순으로 페이징해 가져옵니다.
- [최근 단어](./words/view.md#recent-words): `token`의 사용자가 최근 생성한 단어 최대 10개를 가져옵니다.
- [랜덤 단어](./words/view.md#random-words): 주어진 숫자의 단어를 랜덤으로 가져옵니다.
  
### [단어 검색]()
디미워드 단어를 검색합니다.

## 단어장
디미워드 단어장 오브젝트를 관리합니다.

- [단어장 생성]()
- [단어장 조회]()

## 통계

- [랭킹](./stats/rank.md)
