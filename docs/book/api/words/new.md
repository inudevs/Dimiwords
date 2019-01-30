# 단어 생성
디미워드 단어 생성

## Create New Word

### Request

https://dimiwords.tk:5000/api/create/word

위 URL로 서버에 `POST` 요청을 보냅니다. `POST` 요청은 아래와 같은 형식의 JSON 데이터를 전송합니다.

```json
{
    "en": "dimigo",
    "ko": [
        "디미고",
        "한국디지털미디어고등학교"
    ],
    "token": "6815ZX0jKOj5X63aFFDDkHiO"
}
```

- `en`: 소문자 영단어
- `ko`: 영단어의 한글 뜻으로 이루어진 리스트
- `token`: 사용자 토큰 

### Response

요청이 정상적으로 처리되었다면, 아래와 같은 데이터가 반환됩니다.

#### Success

```json
{
    "success": true,
    "message": "Word saved successfully"
}
```
