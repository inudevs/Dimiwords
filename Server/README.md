# Dimiwords-Server
API server of Dimiwords

## models

### User
```js
{
  name: String, // 사용자 이름
  intro: String, // 사용자 소개
  email: { type: String, unique: true, required: true, dropDups: true }, // 사용자 이메일
  password: { type: String, required: true }, // 사용자 비밀번호(md5로 해싱)
  department: Number, // 사용자 학과(department index)
  points: Number, // 사용자 포인트
  profile: String, // 사용자 프로필 URL
  accept: Number, // 사용자가 맞춘 단어 수 
  submit: Number // 사용자가 채점을 시도한 단어 수
}
```

`User.accept`, `User.submit`을 이용해서 해당 사용자의 정답률을 구한다.

#### department index
```js
{ 'eb': 0, 'dc': 1, 'wp': 2, 'hd': 3 }
```

- `이비즈니스과`: 0
- `디지털컨텐츠과`: 1
- `웹프로그래밍과`: 2
- `해킹방어과`: 3

### Word
```js
{
  en: String, // 영단어
  ko: [String], // 한글 뜻으로 이루어진 리스트
  userId: String, // 단어를 생성한 사용자 _id
  accept: Number, // 단어 정답 수
  submit: Number // 단어 채점 시도 수
}
```

### Wordbook
```js
{
  name: String, // 단어장 이름
  intro: String, // 단어장 소개
  words: [WordSchema], // 단어장에 포함된 단어로 이루어진 리스트
  user: String // 단어장을 생성한 사용자 name
}
```

## routes

### /api/auth
| 경로 | 설명 |
|:--------|:--------|
| `/login` | 로그인 성공 시 토큰을 반환 |
| `/check` | 사용자 토큰이 필요, 주어진 id를 가지는 `word`의 답과 `answer`를 비교해서 맞으면 토큰의 사용자에게 포인트 지급 |

### /api/list
사용자 토큰이 필요

| 경로 | 설명 |
|:--------|:--------|
| `/words` | `word` 목록, 페이징 |
| `/wordbooks` | `wordbook`(각 단어장에 포함된 `word` 5개 포함) 목록, 페이징 |
| `/rank` | `user` 목록(`user.points` 순), 페이징 |

### /api/get
사용자 토큰이 필요

| 경로 | 설명 |
|:--------|:--------|
| `/wordbook/{id}` | `id`를 가지는 `wordbook`를 반환 |

### /api/create
`/user` 이외의 모든 route에서 사용자 토큰이 필요

| 경로 | 설명 |
|:--------|:--------|
| `/word` | `word` 생성 |
| `/wordbook` | `wordbook` 생성 |
| `/user` | `user` 생성 |

### /api/search
Todo

## secret.json 
```json
{
    "mongo": "mongodb://localhost:27017/words"
}
```

- `mongo`: mongo connection string

위 형식으로 mongo connection string을 포함하는 `secret.json` 파일을 만들어 두어야 한다.
