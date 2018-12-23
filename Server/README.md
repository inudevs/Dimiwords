# Dimiwords-Server
API server of Dimiwords

## models

### word
```json
{
    "_id": "id",
    "en": "dimigo",
    "ko": ["디미고", "한국디지털미디어고등학교"]
}
```

- `_id`: id
- `en`: 영단어
- `ko`: 영단어의 한국어 뜻으로 이루어진 배열

### wordbook
```json
{
    "_id": "id",
    "name": "디미고 단어장",
    "intro": "스웨그 넘치는 디미고 라이프",
    "words": [
        {
            "_id": "id",
            "en": "dimigo",
            "ko": ["디미고", "한국디지털미디어고등학교"]
        }
    ]
}
```

- `_id`: id
- `name`: 단어장의 이름
- `intro`: 단어장 내용(소개)
- `words`: 단어장에 포함된 `word`의 `WordSchema`로 이루어진 배열

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

### /api/get
사용자 토큰이 필요

| 경로 | 설명 |
|:--------|:--------|
| `/word/{id}` | `id`를 가지는 `word`를 반환 |
| `/wordbook/{id}` | `id`를 가지는 `wordbook`를 반환 |
| `/user/{id}` | `id`를 가지는 `user`를 반환(단, `password` 필드는 제외된다) |

### /api/create
사용자 토큰이 필요

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
