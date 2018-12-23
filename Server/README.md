# Dimiwords-Server
API server of Dimiwords

## models
Todo(documentation)

## routes

### /api/auth
| 경로 | 설명 |
|:--------|:--------|
| `/login` | 로그인 성공 시 토큰을 반환 |

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
| `/word/{id}` | `id`를 가지는 `word`를 반환 |
| `/wordbook/{id}` | `id`를 가지는 `wordbook`를 반환 |
| `/user/{id}` | `id`를 가지는 `user`를 반환(단, `password` 필드는 제외된다) |

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
