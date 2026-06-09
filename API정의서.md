# API 정의서

## 1. 기본 정보

| 항목     | 내용                                       |
| ------ | ---------------------------------------- |
| API 이름 | 도서관리시스템 API                       |
| 버전     | v1                                       |
| 기본 URL | `http://localhost:8080`                  |
| 인증 방식  | Bearer Token                             |
| 데이터 형식 | JSON                                     |
| 주요 리소스 | User, Book, Review, BookLike, ReviewLike |

---

## 2. 인증

로그인이 필요한 API는 요청 헤더에 Access Token을 포함한다.

```txt
Authorization: Bearer {accessToken}
```

### 인증이 필요한 API

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/users/me`               |
| PATCH  | `/users/me`               |
| POST   | `/books`                  |
| PATCH  | `/books/{id}`             |
| PATCH  | `/books/{id}/cover`       |
| DELETE | `/books/{id}`             |
| POST   | `/books/{id}/likes`       |
| DELETE | `/books/{id}/likes/me`    |
| POST   | `/books/{bookId}/reviews` |
| PATCH  | `/reviews/{id}`           |
| DELETE | `/reviews/{id}`           |
| POST   | `/reviews/{id}/likes`     |
| DELETE | `/reviews/{id}/likes/me`  |

---

## 3. 공통 오류 응답

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "리소스를 찾을 수 없습니다.",
  "path": "/books/999"
}
```

|                     상태 코드 | 설명                 |
| ------------------------: | ------------------ |
|           400 Bad Request | 필수 필드 누락 또는 잘못된 요청 |
|          401 Unauthorized | 인증되지 않은 사용자        |
|             403 Forbidden | 요청 권한 없음           |
|             404 Not Found | 리소스를 찾을 수 없음       |
|              409 Conflict | 중복 요청 또는 중복 데이터    |
| 500 Internal Server Error | 서버 내부 오류           |

---

# 4. Auth API

## 4.1 회원가입

### Request

```txt
POST /auth/signup
```

### 설명

새로운 사용자를 등록한다.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password1234",
  "nickname": "독서왕"
}
```

### Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "nickname": "독서왕",
  "role": "USER",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T09:00:00"
}
```

### 상태 코드

|              코드 | 설명                  |
| --------------: | ------------------- |
|     201 Created | 회원가입 성공             |
| 400 Bad Request | 필수 필드 누락 또는 형식 오류   |
|    409 Conflict | 이미 사용 중인 이메일 또는 닉네임 |

---

## 4.2 로그인

### Request

```txt
POST /auth/login
```

### 설명

이메일과 비밀번호로 로그인한다.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password1234"
}
```

### Response

```json
{
  "accessToken": "jwt-access-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "독서왕",
    "role": "USER"
  }
}
```

### 상태 코드

|               코드 | 설명              |
| ---------------: | --------------- |
|           200 OK | 로그인 성공          |
|  400 Bad Request | 이메일 또는 비밀번호 누락  |
| 401 Unauthorized | 이메일 또는 비밀번호 불일치 |

---

# 5. Users API

## 5.1 내 정보 조회

### Request

```txt
GET /users/me
```

### 설명

현재 로그인한 사용자의 정보를 조회한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "nickname": "독서왕",
  "role": "USER",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T09:00:00"
}
```

### 상태 코드

|               코드 | 설명          |
| ---------------: | ----------- |
|           200 OK | 내 정보 조회 성공  |
| 401 Unauthorized | 인증되지 않은 사용자 |

---

## 5.2 내 정보 수정

### Request

```txt
PATCH /users/me
```

### 설명

현재 로그인한 사용자의 닉네임 또는 비밀번호를 수정한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Request Body

```json
{
  "nickname": "새닉네임",
  "password": "newPassword1234"
}
```

### Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "nickname": "새닉네임",
  "role": "USER",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T12:00:00"
}
```

### 상태 코드

|               코드 | 설명           |
| ---------------: | ------------ |
|           200 OK | 내 정보 수정 성공   |
|  400 Bad Request | 잘못된 요청       |
| 401 Unauthorized | 인증되지 않은 사용자  |
|     409 Conflict | 이미 사용 중인 닉네임 |

---

# 6. Books API

## 6.1 도서 목록 조회

### Request

```txt
GET /books
```

### 설명

전체 도서 목록을 조회한다.

### Query Parameter

| 이름      | 위치    | 타입     | 필수 | 설명                                |
| ------- | ----- | ------ | -: | --------------------------------- |
| keyword | query | String | 선택 | 도서명, 작가, 내용 검색어                   |
| sort    | query | String | 선택 | 정렬 기준: `latest`, `likes`, `title` |

### Request 예시

```txt
GET /books
GET /books?keyword=소설
GET /books?sort=likes
```

### Response

```json
[
  {
    "id": 1,
    "userId": 1,
    "ownerNickname": "독서왕",
    "title": "돌이킬 수 있는",
    "author": "문목하",
    "tag": ["한국소설", "SF"],
    "likes": 1,
    "likedByMe": false,
    "content": "촉망받는 신입 수사관 윤서리...",
    "coverImageUrl": "https://image.aladin.co.kr/product/...",
    "createdAt": "2026-05-22T09:00:00",
    "updatedAt": "2026-05-22T09:00:00"
  }
]
```

### 상태 코드

|     코드 | 설명          |
| -----: | ----------- |
| 200 OK | 도서 목록 조회 성공 |

---

## 6.2 도서 상세 조회

### Request

```txt
GET /books/{id}
```

### 설명

특정 도서의 상세 정보를 조회한다.

### Path Variable

| 이름 | 타입   | 설명        |
| -- | ---- | --------- |
| id | Long | 조회할 도서 ID |

### Response

```json
{
  "id": 1,
  "userId": 1,
  "ownerNickname": "독서왕",
  "title": "돌이킬 수 있는",
  "author": "문목하",
  "tag": ["한국소설", "SF"],
  "likes": 1,
  "likedByMe": true,
  "content": "촉망받는 신입 수사관 윤서리...",
  "coverImageUrl": "https://image.aladin.co.kr/product/...",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T09:00:00"
}
```

### 상태 코드

|            코드 | 설명             |
| ------------: | -------------- |
|        200 OK | 도서 상세 조회 성공    |
| 404 Not Found | 해당 도서를 찾을 수 없음 |

---

## 6.3 도서 등록

### Request

```txt
POST /books
```

### 설명

로그인한 사용자가 새로운 도서를 등록한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Request Body

```json
{
  "title": "새 도서 제목",
  "author": "작가명",
  "tag": ["한국소설", "감성"],
  "content": "도서 내용 또는 줄거리",
  "coverImageUrl": ""
}
```

### Response

```json
{
  "id": 2,
  "userId": 1,
  "ownerNickname": "독서왕",
  "title": "새 도서 제목",
  "author": "작가명",
  "tag": ["한국소설", "감성"],
  "likes": 0,
  "likedByMe": false,
  "content": "도서 내용 또는 줄거리",
  "coverImageUrl": "",
  "createdAt": "2026-05-22T10:00:00",
  "updatedAt": "2026-05-22T10:00:00"
}
```

### 상태 코드

|               코드 | 설명          |
| ---------------: | ----------- |
|      201 Created | 도서 등록 성공    |
|  400 Bad Request | 필수 필드 누락    |
| 401 Unauthorized | 인증되지 않은 사용자 |

---

## 6.4 도서 수정

### Request

```txt
PATCH /books/{id}
```

### 설명

기존 도서 정보를 부분 수정한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명        |
| -- | ---- | --------- |
| id | Long | 수정할 도서 ID |

### Request Body

```json
{
  "title": "수정된 도서 제목",
  "author": "수정된 작가명",
  "tag": ["해외소설", "고전"],
  "content": "수정된 도서 내용"
}
```

### Response

```json
{
  "id": 1,
  "userId": 1,
  "ownerNickname": "독서왕",
  "title": "수정된 도서 제목",
  "author": "수정된 작가명",
  "tag": ["해외소설", "고전"],
  "likes": 1,
  "likedByMe": false,
  "content": "수정된 도서 내용",
  "coverImageUrl": "https://image.aladin.co.kr/product/...",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T11:00:00"
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|           200 OK | 도서 수정 성공       |
|  400 Bad Request | 필수 필드 검증 실패    |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    403 Forbidden | 수정 권한 없음       |
|    404 Not Found | 해당 도서를 찾을 수 없음 |

---

## 6.5 AI 표지 이미지 저장

### Request

```txt
PATCH /books/{id}/cover
```

### 설명

AI로 생성한 표지 이미지 Data URL을 도서의 `coverImageUrl`에 저장한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명            |
| -- | ---- | ------------- |
| id | Long | 표지를 저장할 도서 ID |

### Request Body

```json
{
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### Response

```json
{
  "id": 1,
  "userId": 1,
  "ownerNickname": "독서왕",
  "title": "돌이킬 수 있는",
  "author": "문목하",
  "tag": ["한국소설", "SF"],
  "likes": 1,
  "likedByMe": false,
  "content": "촉망받는 신입 수사관 윤서리...",
  "coverImageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "createdAt": "2026-05-22T09:00:00",
  "updatedAt": "2026-05-22T11:30:00"
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|           200 OK | 표지 이미지 저장 성공   |
|  400 Bad Request | 표지 이미지 URL 누락  |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    403 Forbidden | 수정 권한 없음       |
|    404 Not Found | 해당 도서를 찾을 수 없음 |

---

## 6.6 도서 삭제

### Request

```txt
DELETE /books/{id}
```

### 설명

특정 도서를 삭제한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명        |
| -- | ---- | --------- |
| id | Long | 삭제할 도서 ID |

### Response

응답 본문 없음.

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|   204 No Content | 도서 삭제 성공       |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    403 Forbidden | 삭제 권한 없음       |
|    404 Not Found | 해당 도서를 찾을 수 없음 |

---

# 7. Book Likes API

## 7.1 도서 좋아요 등록

### Request

```txt
POST /books/{id}/likes
```

### 설명

로그인한 사용자가 특정 도서에 좋아요를 누른다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명            |
| -- | ---- | ------------- |
| id | Long | 좋아요를 누를 도서 ID |

### Request Body

없음

### Response

```json
{
  "bookId": 1,
  "userId": 1,
  "likes": 2,
  "likedByMe": true
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|      201 Created | 도서 좋아요 등록 성공   |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    404 Not Found | 해당 도서를 찾을 수 없음 |
|     409 Conflict | 이미 좋아요를 누른 도서  |

---

## 7.2 도서 좋아요 취소

### Request

```txt
DELETE /books/{id}/likes/me
```

### 설명

현재 로그인한 사용자가 특정 도서에 누른 좋아요를 취소한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명             |
| -- | ---- | -------------- |
| id | Long | 좋아요를 취소할 도서 ID |

### Response

응답 본문 없음.

### 상태 코드

|               코드 | 설명                    |
| ---------------: | --------------------- |
|   204 No Content | 도서 좋아요 취소 성공          |
| 401 Unauthorized | 인증되지 않은 사용자           |
|    404 Not Found | 좋아요 기록 또는 도서를 찾을 수 없음 |

---

# 8. Reviews API

## 8.1 리뷰 전체 조회

### Request

```txt
GET /reviews
```

### 설명

전체 리뷰 목록을 조회한다.

### Response

```json
[
  {
    "id": 1,
    "bookId": 1,
    "bookTitle": "돌이킬 수 있는",
    "userId": 1,
    "nickname": "독서왕",
    "content": "흥미로운 설정이 좋았습니다.",
    "likes": 0,
    "likedByMe": false,
    "createdAt": "2026-05-22T10:00:00",
    "updatedAt": "2026-05-22T10:00:00"
  }
]
```

### 상태 코드

|     코드 | 설명          |
| -----: | ----------- |
| 200 OK | 리뷰 전체 조회 성공 |

---

## 8.2 특정 도서 리뷰 조회

### Request

```txt
GET /reviews?bookId={bookId}
```

### 설명

특정 도서에 작성된 리뷰 목록을 조회한다.

### Query Parameter

| 이름     | 타입   | 필수 | 설명            |
| ------ | ---- | -: | ------------- |
| bookId | Long | 필수 | 리뷰가 연결된 도서 ID |

### Response

```json
[
  {
    "id": 1,
    "bookId": 1,
    "bookTitle": "돌이킬 수 있는",
    "userId": 1,
    "nickname": "독서왕",
    "content": "흥미로운 설정이 좋았습니다.",
    "likes": 0,
    "likedByMe": false,
    "createdAt": "2026-05-22T10:00:00",
    "updatedAt": "2026-05-22T10:00:00"
  }
]
```

### 상태 코드

|            코드 | 설명             |
| ------------: | -------------- |
|        200 OK | 특정 도서 리뷰 조회 성공 |
| 404 Not Found | 해당 도서를 찾을 수 없음 |

---

## 8.3 리뷰 등록

### Request

```txt
POST /books/{bookId}/reviews
```

### 설명

로그인한 사용자가 특정 도서에 리뷰를 작성한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름     | 타입   | 설명            |
| ------ | ---- | ------------- |
| bookId | Long | 리뷰를 작성할 도서 ID |

### Request Body

```json
{
  "content": "흥미로운 설정이 좋았습니다."
}
```

### Response

```json
{
  "id": 1,
  "bookId": 1,
  "bookTitle": "돌이킬 수 있는",
  "userId": 1,
  "nickname": "독서왕",
  "content": "흥미로운 설정이 좋았습니다.",
  "likes": 0,
  "likedByMe": false,
  "createdAt": "2026-05-22T10:00:00",
  "updatedAt": "2026-05-22T10:00:00"
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|      201 Created | 리뷰 등록 성공       |
|  400 Bad Request | 리뷰 내용 누락       |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    404 Not Found | 해당 도서를 찾을 수 없음 |

---

## 8.4 리뷰 수정

### Request

```txt
PATCH /reviews/{id}
```

### 설명

기존 리뷰 내용을 수정한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명        |
| -- | ---- | --------- |
| id | Long | 수정할 리뷰 ID |

### Request Body

```json
{
  "content": "수정된 리뷰 내용입니다."
}
```

### Response

```json
{
  "id": 1,
  "bookId": 1,
  "bookTitle": "돌이킬 수 있는",
  "userId": 1,
  "nickname": "독서왕",
  "content": "수정된 리뷰 내용입니다.",
  "likes": 0,
  "likedByMe": false,
  "createdAt": "2026-05-22T10:00:00",
  "updatedAt": "2026-05-22T11:00:00"
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|           200 OK | 리뷰 수정 성공       |
|  400 Bad Request | 리뷰 내용 누락       |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    403 Forbidden | 수정 권한 없음       |
|    404 Not Found | 해당 리뷰를 찾을 수 없음 |

---

## 8.5 리뷰 삭제

### Request

```txt
DELETE /reviews/{id}
```

### 설명

특정 리뷰를 삭제한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명        |
| -- | ---- | --------- |
| id | Long | 삭제할 리뷰 ID |

### Response

응답 본문 없음.

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|   204 No Content | 리뷰 삭제 성공       |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    403 Forbidden | 삭제 권한 없음       |
|    404 Not Found | 해당 리뷰를 찾을 수 없음 |

---

# 9. Review Likes API

## 9.1 리뷰 좋아요 등록

### Request

```txt
POST /reviews/{id}/likes
```

### 설명

로그인한 사용자가 특정 리뷰에 좋아요를 누른다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명            |
| -- | ---- | ------------- |
| id | Long | 좋아요를 누를 리뷰 ID |

### Request Body

없음

### Response

```json
{
  "reviewId": 1,
  "userId": 1,
  "likes": 1,
  "likedByMe": true
}
```

### 상태 코드

|               코드 | 설명             |
| ---------------: | -------------- |
|      201 Created | 리뷰 좋아요 등록 성공   |
| 401 Unauthorized | 인증되지 않은 사용자    |
|    404 Not Found | 해당 리뷰를 찾을 수 없음 |
|     409 Conflict | 이미 좋아요를 누른 리뷰  |

---

## 9.2 리뷰 좋아요 취소

### Request

```txt
DELETE /reviews/{id}/likes/me
```

### 설명

현재 로그인한 사용자가 특정 리뷰에 누른 좋아요를 취소한다.

### Headers

```txt
Authorization: Bearer {accessToken}
```

### Path Variable

| 이름 | 타입   | 설명             |
| -- | ---- | -------------- |
| id | Long | 좋아요를 취소할 리뷰 ID |

### Response

응답 본문 없음.

### 상태 코드

|               코드 | 설명                    |
| ---------------: | --------------------- |
|   204 No Content | 리뷰 좋아요 취소 성공          |
| 401 Unauthorized | 인증되지 않은 사용자           |
|    404 Not Found | 좋아요 기록 또는 리뷰를 찾을 수 없음 |

---

# 10. OpenAI Image Generation API

## 10.1 AI 표지 생성

### Request

```txt
POST https://api.openai.com/v1/images/generations
```

### 설명

도서 제목, 태그, 내용을 기반으로 AI 표지 이미지를 생성한다.
해당 요청은 Frontend에서 OpenAI API로 직접 보낸다.

### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {사용자_OPENAI_API_KEY}"
}
```

### Request Body

```json
{
  "model": "gpt-image-2",
  "prompt": "도서 제목과 내용을 기반으로 구성한 표지 생성 프롬프트",
  "n": 1,
  "size": "1024x1536",
  "quality": "medium",
  "output_format": "png"
}
```

### Response

```json
{
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

### 상태 코드

|               코드 | 설명               |
| ---------------: | ---------------- |
|           200 OK | 이미지 생성 성공        |
|  400 Bad Request | 잘못된 요청           |
| 401 Unauthorized | OpenAI API 인증 실패 |

---

# 11. API 요약표

## 11.1 Auth API

| 기능   | Method | URL            | 인증  |
| ---- | ------ | -------------- | --- |
| 회원가입 | POST   | `/auth/signup` | 불필요 |
| 로그인  | POST   | `/auth/login`  | 불필요 |

## 11.2 Users API

| 기능      | Method | URL         | 인증 |
| ------- | ------ | ----------- | -- |
| 내 정보 조회 | GET    | `/users/me` | 필요 |
| 내 정보 수정 | PATCH  | `/users/me` | 필요 |

## 11.3 Books API

| 기능       | Method | URL                 | 인증  |
| -------- | ------ | ------------------- | --- |
| 도서 목록 조회 | GET    | `/books`            | 불필요 |
| 도서 상세 조회 | GET    | `/books/{id}`       | 불필요 |
| 도서 등록    | POST   | `/books`            | 필요  |
| 도서 수정    | PATCH  | `/books/{id}`       | 필요  |
| AI 표지 저장 | PATCH  | `/books/{id}/cover` | 필요  |
| 도서 삭제    | DELETE | `/books/{id}`       | 필요  |

## 11.4 Book Likes API

| 기능        | Method | URL                    | 인증 |
| --------- | ------ | ---------------------- | -- |
| 도서 좋아요 등록 | POST   | `/books/{id}/likes`    | 필요 |
| 도서 좋아요 취소 | DELETE | `/books/{id}/likes/me` | 필요 |

## 11.5 Reviews API

| 기능          | Method | URL                        | 인증  |
| ----------- | ------ | -------------------------- | --- |
| 리뷰 전체 조회    | GET    | `/reviews`                 | 불필요 |
| 특정 도서 리뷰 조회 | GET    | `/reviews?bookId={bookId}` | 불필요 |
| 리뷰 등록       | POST   | `/books/{bookId}/reviews`  | 필요  |
| 리뷰 수정       | PATCH  | `/reviews/{id}`            | 필요  |
| 리뷰 삭제       | DELETE | `/reviews/{id}`            | 필요  |

## 11.6 Review Likes API

| 기능        | Method | URL                      | 인증 |
| --------- | ------ | ------------------------ | -- |
| 리뷰 좋아요 등록 | POST   | `/reviews/{id}/likes`    | 필요 |
| 리뷰 좋아요 취소 | DELETE | `/reviews/{id}/likes/me` | 필요 |

## 11.7 OpenAI API

| 기능       | Method | URL                                            | 인증                |
| -------- | ------ | ---------------------------------------------- | ----------------- |
| AI 표지 생성 | POST   | `https://api.openai.com/v1/images/generations` | OpenAI API Key 필요 |
