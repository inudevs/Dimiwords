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
| 경로 | 설명 |
|:--------|:--------|
| `/api` | 모든 `wordbook`의 리스트를 반환한다(todo: 모든 정보를 반환하는 대신 `wordbook`에 포함된 `word`를 5개 랜덤으로 가져오는 쪽으로 수정할 것). |
| `/api/words` | 모든 `word`의 리스트를 반환한다. |
| `/api/{id}` | `id`를 가지는 `wordbook`의 정보를 반환한다. |
| `/api/new/word` | 전달받은 데이터로 새로운 `word`을 만든다. |
| `/api/new/wordbook` | 전달받은 데이터로 새로운 `wordbook`을 만든다. |
