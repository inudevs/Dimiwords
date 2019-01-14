# 사용자 계정 인증
로그인 및 로그아웃

## Login

[디미워드(Dimiwords)](https://github.com/CIVAR-DIMIGO/Dimiwords)는 JWT(JSON Web Token) 기반 인증을 사용합니다.

### Request

https://dimiwords.tk:5000/api/auth/login

위 URL로 서버에 `POST` 요청을 보냅니다. `POST` 요청은 아래와 같은 형식의 JSON 데이터를 전송합니다.

```json
{
    "email": "email@example.com",
    "password": "password"
}
```

- `email`: 사용자 이메일
- `password`: 사용자 패스워드

### Response

#### Success

요청이 정상적으로 처리되었다면, 아래와 같은 데이터가 반환됩니다.

```json
{
    "success": true,
    "token": "6815ZX0jKOj5X63aFFDDkHiO",
    "user": {
        "name": "Civar",
        "intro": "Lorem Ipsum",
        "email": "email@example.com",
        "department": 3,
        "points": 20,
        "submit": 100,
        "accept": 20
    }
}
```

- `success`: 성공 여부
- `token`: 로그인한 사용자에 대한 토큰
- `user`: 로그인한 시점의 사용자 정보
    - `name`: 사용자 이름
    - `intro`: 사용자 소개
    - `email`: 사용자 이메일(로그인 시 아이디로 사용됨)
    - `department`: 사용자 학과
        ```json
        { "eb": 0, "dc": 1, "wp": 2, "hd": 3 }
        ```
        숫자는 각각 `이비즈니스과`, `디지털컨텐츠과`, `웹프로그래밍과`, `해킹방어과`의 4개 학과에 대한 인덱스를 의미합니다.
    - `points`: 사용자 포인트
    - `submit`: 단어 제출 수
    - `accept`: 단어 제출 중 정답 수 

##### 주의 및 참고 사항

- 로그인 시 반환되는 사용자 정보는 로그인 시점의 데이터이므로, 이후 업데이트하지 않고 점수나 정답률 등의 데이터를 사용하는 경우 문제가 발생할 수 있습니다.

#### Error

##### 로그인 정보와 같은 사용자가 존재하지 않음

```json
{
    "success": false,
    "error": "No User"
}
```

- `success`: 성공 여부
- `error`: 에러 메세지

##### 로그인 처리 중 서버 에러가 발생함

```json
{
    "success": false,
    "error": "Error"
}
```

- `success`: 성공 여부
- `error`: 에러 메세지

## Logout

현재는 로그아웃 시 클라이언트에서 발급받은 토큰을 파기하는 방법으로 임시로 구현되어 있습니다. 

추후 로그아웃 시 사용자 토큰을 서버로 보내면 이를 블랙리스트에 등록하는(또는 토큰 화이트리스트 시스템을 적용) 인터페이스를 추가할 예정입니다.

현재 시점의 클라이언트 개발자 역시 로그아웃 시 토큰을 파기하는 방법을 이용해 임시로 로그아웃 처리를 할 수 있습니다.
