# 랭킹
사용자 포인트 랭킹

## Rank

### Request

https://dimiwords.tk:5000/api/list/rank

https://dimiwords.tk:5000/api/list/rank?page=2

- `page`: 조회하려는 랭킹 페이지(기본값은 1)

위 URL로 서버에 `GET` 요청을 보냅니다.

### Response

```json
{
    "success": true,
    "result": {
        "docs": [
            { 
                "name": "User One", "intro": "Lorem ipsum dolor sit amet",
                "department": 3, "points": 2788, "accept": 2257, "submit": 2532
            }, {
                "name": "User Two", "intro": "Consectetur adipiscing elit",
                "department": 2, "points": 1617, "submit": 596, "accept": 547
            },{
                "name": "User Three", "intro": "Sed do eiusmod tempor",
                "department": 2, "points": 1201, "submit": 175, "accept": 161
            },
            (...)
        ],
        "limit": 20,
        "page": 1,
        "pages": 4
    }
}
```
