# 사용자 계정 생성
회원 가입

## Join

### Request 

https://dimiwords.tk:5000/api/create/user

위 URL로 서버에 `POST` 요청을 보냅니다. `POST` 요청은 아래와 같은 형식의 JSON 데이터를 전송합니다.

```json
{
    "name": "Civar",
    "password": "password",
    "email": "email@example.com",
    "intro": "Lorem Ipsum",
    "department": 3
}
```

- `name`: 사용자 이름
- `password`: 사용자 패스워드
- `email`: 사용자 이메일(로그인 시 아이디로 사용됨)
- `intro`: 사용자 소개
- `department`: 사용자 학과
    ```json
    { "eb": 0, "dc": 1, "wp": 2, "hd": 3 }
    ```
    숫자는 각각 `이비즈니스과`, `디지털컨텐츠과`, `웹프로그래밍과`, `해킹방어과`의 4개 학과에 대한 인덱스를 의미합니다.

### Response

#### Success

```json
{
    "success": false,
    "error": "User saved successfully"
}
```

- `success`: 성공 여부
- `message`: 성공 메세지

#### Error

##### 동일한 이메일의 사용자가 존재함

```json
{
    "success": false,
    "error": "User exists"
}
```

- `success`: 성공 여부
- `error`: 에러 메세지

##### 계정 생성 중 서버 에러가 발생

```json
{
    "success": false,
    "error": "Error"
}
```

- `success`: 성공 여부
- `error`: 에러 메세지
