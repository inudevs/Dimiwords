# 단어 조회 
디미워드 단어 조회

## All Words
전체 사용자가 생성한 단어 목록을 최신순으로 정렬하여 가져옵니다. 한 페이지당 최대 9개의 단어가 존재합니다.

### Request

https://dimiwords.tk:5000/api/list/words

https://dimiwords.tk:5000/api/list/words?page=2

- `page`: 조회하려는 랭킹 페이지(기본값은 1)

`GET`

### Response

```json
{
    "success": true,
    "result": {
        "docs": [
            { 
                "ko": ["새로운", "최근의"], 
                "_id": "w68dzw02km1uvxlg8hp1e0", 
                "en": "new",
                "userId": "36ene43mhfytrih08m1blt"
            },
            {
                "ko": ["오래된", "늙은"],
                "_id": "lzaxzxzc4s48eaazj802",
                "en": "old",
                "userId": "jm38tfot7c0m9d2tww7r"
            },
            {
                "ko": ["디미고", "한국디지털미디어고등학교"],
                "_id": "vkc9jbjarivd7nti9lec2z",
                "en":"dimigo",
                "userId": "naye1utuap0ryu1almppg6"
            },
            (...)
        ],
        "total": 776,
        "limit": 9,
        "page": 1,
        "pages": 87
    }
}
```

## Recent Words
사용자 토큰의 사용자가 최근 생성한 단어를 최신순으로 정렬하여 최대 10개 가져옵니다.

### Request

https://dimiwords.tk:5000/api/get/recent

`POST`

```json
{
    "token": "6815ZX0jKOj5X63aFFDDkHiO"
}
```

### Response

```json
{
    "success": true,
    "recents": [
        { 
            "ko": ["디미고", "한국디지털미디어고등학교"],
            "_id": "vkc9jbjarivd7nti9lec2z",
            "en": "dimigo",
            "accept": 80,
            "submit": 7,
            "userId": "naye1utuap0ryu1almppg6"
        }
    ]
}
```

## Random Words 
요청받은 갯수만큼 랜덤 단어의 한글 뜻을 가져옵니다.

### Request

http://localhost:3000/api/get/random/{value}

http://localhost:3000/api/get/random/5

`GET`

### Response

```json
{
    "success": true,
    "result": ["축하하다", "유효한", "이상", "보증하다", "성명서"]
}
```
