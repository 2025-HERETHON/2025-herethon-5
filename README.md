# 젠터러시

<img width="1876" height="1055" alt="image" src="https://github.com/user-attachments/assets/9fa31932-fda3-47cf-aedc-10a07aeb0ace" />


- 배포 URL : https://ohmycode-readme.netlify.app
- Test ID : readme@test.com
- Test PW : 123123

<br>

## 프로젝트 소개(수정 필요)

- README는 책을 좋아하는 사람들이 자신의 책 취향을 공유하고, 다 읽은 책을 판매할 수 있는 SNS입니다.
- 개인의 프로필 페이지에 좋아하는 구절 등 책에 대한 정보를 작성하고 판매하고 싶은 책을 등록할 수 있습니다.
- 검색을 통해 책 취향이 비슷한 다른 유저들의 피드를 구경할 수 있습니다.
- 다양한 유저들을 팔로우하며 마음에 드는 게시글에 좋아요를 누르거나 댓글을 작성할 수 있습니다.

<br>

## 팀원 구성

<div align="center">

| **이도윤** | **이주연** | **서태영** | **고유빈** | **이채빈** | **김유빈** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| [<img src="https://github.com/user-attachments/assets/892b7b60-75b7-4230-941a-f1bd013242cb" height=150 width=150> <br/> ](https://github.com/yeon1615) | [<img src="https://github.com/user-attachments/assets/92b8fdce-9e3c-4dbd-b70e-82c188a4076b" height=150 width=150> <br/> @leejuyeon7852](https://github.com/Cheorizzang) | [<img src="https://github.com/user-attachments/assets/55c98c6e-1ef9-4deb-8fd6-f84af505f097" height=150 width=150> <br/> @taeyoung0524](https://github.com/heejiyang) | [<img src="https://github.com/user-attachments/assets/210d2d1a-b821-46e3-98f7-2db7923a3855" height=150 width=150> <br/> @rhdbqls](https://github.com/journey-ji) | [<img src="https://github.com/user-attachments/assets/9b160457-70a2-4d51-bf95-677c52190176" height=150 width=150> <br/> @haebin1207](https://github.com/newmember1) | [<img src="https://github.com/user-attachments/assets/17a747d8-fa1f-4611-933d-306ce492023d" height=150 width=150> <br/> @kimybin](https://github.com/newmember2) |
| PM/Design | Back-end | Front-end | Back-end | Front-end | Front-end |

</div>

<br>

## 1. 협업 툴 및 기술 스택

- Front 
<div>
    <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

- Back-end
<div>
    <img src="https://img.shields.io/badge/python-E34F26?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/Django-1572B6?style=for-the-badge&logo=Django&logoColor=white">
</div>

- 협업 툴
<div>
    <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
    <img src="https://img.shields.io/badge/notion-E53888?style=for-the-badge&logo=notion&logoColor=white"/>
    <img src="https://img.shields.io/badge/figma-89AC46?style=for-the-badge&logo=figma&logoColor=white"/>
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
</div>
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React, styled-component

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- styled-component
    - props를 이용한 조건부 스타일링을 활용하여 상황에 알맞은 스타일을 적용시킬 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
    - S dot naming을 통해 일반 컴포넌트와 스타일드 컴포넌트를 쉽게 구별하도록 했습니다.
    
### Recoil

- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- Redux가 아닌 Recoil을 채택한 이유
    - Recoil은 React만을 위한 라이브러리로, 사용법도 기존의 useState 훅을 사용하는 방식과 유사해 학습비용을 낮출 수 있었습니다.
    - 또한 Redux보다 훨씬 적은 코드라인으로 작동 가능하다는 장점이 있었습니다.
- 로그인과 최초 프로필 설정 시 유저 정보를 atom에 저장하여 필요한 컴포넌트에서 구독하는 방식으로 사용했습니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feature** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 프로젝트 구조

```
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
│
├── public
│    └── index.html
└── src
     ├── App.jsx
     ├── index.jsx
     ├── api
     │     └── mandarinAPI.js
     ├── asset
     │     ├── fonts
     │     ├── css_sprites.png
     │     ├── logo-404.svg
     │     └── logo-home.svg
     │          .
     │          .
     │          .
     ├── atoms
     │     ├── LoginData.js
     │     └── LoginState.js
     ├── common
     │     ├── alert
     │     │     ├── Alert.jsx
     │     │     └── Alert.Style.jsx
     │     ├── button
     │     ├── comment
     │     ├── inputBox
     │     ├── post
     │     ├── postModal
     │     ├── product
     │     ├── tabMenu
     │     ├── topBanner
     │     └── userBanner
     ├── pages
     │     ├── addProduct
     │     │     ├── AddProduct.jsx
     │     │     └── AddProduct.Style.jsx
     │     ├── chatList
     │     ├── chatRoom
     │     ├── emailLogin
     │     ├── followerList
     │     ├── followingList
     │     ├── home
     │     ├── join
     │     ├── page404
     │     ├── postDetail
     │     ├── postEdit
     │     ├── postUpload
     │     ├── productEdit
     │     ├── profile
     │     ├── profileEdit
     │     ├── profileSetting
     │     ├── search
     │     ├── snsLogin
     │     └── splash
     ├── routes
     │     ├── privateRoutes.jsx
     │     └── privateRoutesRev.jsx  
     └── styles
           └── Globalstyled.jsx
```

<br>

## 4. 역할 분담

### 🍊이도윤

- **UI**
    - 페이지 : 홈, 검색, 게시글 작성, 게시글 수정, 게시글 상세, 채팅방
    - 공통 컴포넌트 : 게시글 템플릿, 버튼
- **기능**
    - 유저 검색, 게시글 등록 및 수정, 게시글 상세 확인, 댓글 등록, 팔로워 게시글 불러오기, 좋아요 기능

<br>
    
### 👻이주연

- **UI**
    - 페이지 : 프로필 설정, 프로필 수정, 팔로잉&팔로워 리스트, 상품 등록, 상품 수정, 채팅 목록, 404 페이지
    - 공통 컴포넌트 : 탭메뉴, InputBox, Alert 모달, 댓글
- **기능**
    - 프로필 설정 및 수정 페이지 유저 아이디 유효성 및 중복 검사, 상품 등록 및 수정

<br>

### 😎고유빈

- **UI**
    - 페이지 : splash 페이지, sns 로그인 페이지, 로그인, 회원가입
    - 공통 컴포넌트 : 상품 카드, 사용자 배너
- **기능**
    - splash 페이지, sns로그인 페이지, 로그인 유효성 및 중복 검사, 회원가입 유효성 및 중복 검사, 이메일 검증, 프로필 설정, 접근제한 설정

<br>

### 🐬서태영

- **UI**
    - 페이지 : 사용자 프로필 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 팔로우 & 언팔로우, 로그아웃, 하단 모달창, 댓글 삭제, 게시글 삭제, 상품 삭제, 사용자 게시글 앨범형 이미지, 탑 배너 뒤로가기 버튼, Alert 모달
    
<br>

### 💟김유빈

- **UI**
    - 페이지 : 사용자 프로필 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 팔로우 & 언팔로우, 로그아웃, 하단 모달창, 댓글 삭제, 게시글 삭제, 상품 삭제, 사용자 게시글 앨범형 이미지, 탑 배너 뒤로가기 버튼, Alert 모달
    
<br>

### ⭐이채빈

- **UI**
    - 페이지 : 사용자 프로필 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 팔로우 & 언팔로우, 로그아웃, 하단 모달창, 댓글 삭제, 게시글 삭제, 상품 삭제, 사용자 게시글 앨범형 이미지, 탑 배너 뒤로가기 버튼, Alert 모달
    
<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2022-12-09 ~ 2022-12-31
- UI 구현 : 2022-12-09 ~ 2022-12-16
- 기능 구현 : 2022-12-17 ~ 2022-12-31

<br>

### 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 주간회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 GitHub Wiki에 회의 내용을 기록했습니다.

<br>

## 6. 신경 쓴 부분

- [접근제한 설정](https://github.com/likelion-project-README/README/wiki/README-6.%EC%8B%A0%EA%B2%BD-%EC%93%B4-%EB%B6%80%EB%B6%84_%EC%A0%91%EA%B7%BC%EC%A0%9C%ED%95%9C-%EC%84%A4%EC%A0%95)

- [Recoil을 통한 상태관리 및 유지](https://github.com/likelion-project-README/README/wiki/README-6.%EC%8B%A0%EA%B2%BD-%EC%93%B4-%EB%B6%80%EB%B6%84_Recoil%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EC%9C%A0%EC%A7%80)

<br>

## 7. 페이지별 기능

### [첫페이지]
- 서비스 진입 시 화면 클릭 또는 스크롤하거나 4초가 지나면 main 섹션으로 넘어갑니다. 
- 학습 시작하기 버튼 hover시 "로그인 없이 학습하면 내용이 저장되지 않아요!"와 같은 경고 문구가 뜹니다.

| 첫페이지 |
|----------|
|<img width="2538" height="1395" alt="image" src="https://github.com/user-attachments/assets/bcce75ce-5bf4-4df4-9d48-bc7df1862cf5" />
|<img width="2537" height="1397" alt="image" src="https://github.com/user-attachments/assets/820a8cb8-0797-4e89-b05e-bd368311479e" />|
<br>

### [회원가입]
- 아이디, 이름, 비밀번호를 입력하면 각 입력창에서 즉시 유효성 검사가 진행됩니다.
- 유효성 검사를 통과한 경우, 해당 input창의 배경색이 보라색으로 변경됩니다.
- 유효성 검사를 통과하지 못한 경우, 가입하기 버튼이 비활성화되어 클릭해도 다음 페이지로 이동하지 않습니다.
- 모든 입력값이 유효성을 통과하면 가입하기 버튼이 활성화되며, 버튼을 클릭 시 회원가입 완료페이지로 이동됩니다. 

| 회원가입 |
|----------|
|![join](https://user-images.githubusercontent.com/112460466/210173571-490f5beb-5791-4a4a-8c5e-510cdcb5f1fe.gif)|

<br>

### [로그인]
- 아이디와 비밀번호를 모두 입력하면 즉시 유효성 검사가 진행됩니다.
- 유효성 검사를 통과하지 못한 경우, 로그인하기 버튼이 비활성화되어 클릭할 수 없습니다.
- 유효성 검사를 통과한 후 로그인에 성공하면, 홈페이지로 이동됩니다.
  

| 로그인 |
|----------|
|![setProfile](https://user-images.githubusercontent.com/112460466/210173749-2da6c9af-eb93-4eea-9663-1a03e19299ec.gif)|

<br>

### [홈페이지]
- 로그인 상태에서 프로필 아이콘을 클릭하면, 아이콘 색이 바뀌면서 드롭다운 내용이 뜹니다.
- 로그아웃/비회원 상태에서 '로그인'위에 마우스를 갖다대면 글자 색상이 바뀝니다.
- 또한 '로그인'을 클릭하면 로그인 페이지로 이동합니다. 

| 홈페이지 |
|----------|
|<img width="2558" height="1396" alt="image" src="https://github.com/user-attachments/assets/da70c624-b74c-4c6e-b1a5-9badea15d0e3" />|

<br>

### [마이페이지]
- 나의 학습 페이지
  - 유저의 완료된 학습 목록을 확인할 수 있습니다.
  - 날짜별, 파트별, 버튼 클릭 시 완료된 학습 목록이 각각 날짜별, 파트별로 정렬이 됩니다.
- 비밀번호 변경 페이지
  - 기존 비밀번호 입력 칸은 한 자리 이상 입력 시 배경이 연보라색으로 변경됩니다.
  - 새 비밀번호와 새 비밀번호 확인 입력 칸은 영문 포함 8자리 이상 입력 시 배경이 연보라색으로 변경됩니다.
  - 변경하기 버튼 클릭 시 기존 비밀번호 일치 여부와 새 비밀번호 유효성 검사 후 조건에 맞지 않을 경우에 경고 메세지가 뜹니다.
  - 비밀번호 변경이 완료되면 비밀번호 완료 페이지로 이동합니다.
- 의견 보내기 페이지
  - 파트와 강좌 이름/의견/답변을 받을 이메일 주소 입력 후 전송하기 버튼을 클릭하면 의견 보내기 완료 페이지로 이동합니다. 

| 마이페이지 |
|----------|
|<img width="2560" height="1399" alt="image" src="https://github.com/user-attachments/assets/6670a276-3bb4-4ec7-98a6-cf5db66a005b" />|

<br>

### [학습하기]
- 해당 카테고리 커리큘럼에 대한 학습 내용과 출처가 뜹니다.
- 학습이 완료되면 퀴즈 풀기(O/X와 3지선다) 단계로 넘어가 배운 내용을 복습합니다.
- 학습과 퀴즈가 모두 완료되면 학습 완료 페이지로 이동합니다.
  - 학습과 관련된 의견을 보낼 수 있는 링크가 첨부되어 있습니다.
  - 해당 학습과 관련해서 더 깊은 지식을 얻을 수 있도록 도서 추천 링크가 첨부되어 있습니다.
  - 홈으로 돌아가기/이어서 학습하기 버튼을 띄워 사용자가 학습 주도성을 갖게 합니다.
- 이어서 학습하기 버튼을 누르면, 카테고리 커리큘럼 목록이 나오면서 다음 학습할 커리큘럼을 알려줍니다.
  - 다음 학습할 커리큘럼에 마우스를 갖다대면 색이 변하면서 다른 목록과 차별화됩니다.
- 모든 커리큘럼 학습이 완료되면, 완료 페이지로 이동하고 강좌를 클릭하면 학습했던 내용을 다시 볼 수 있습니다.
  - 또한 홈으로 돌아가서 다른 파트를 학습할 수도 있습니다.

| 학습하기 |
|----------|
|![tab](https://user-images.githubusercontent.com/112460466/210178028-3185f944-6ac1-468a-94ba-b32cdc5e380e.gif)|

<br>

## 8. 트러블 슈팅

- [탭메뉴 프로필 버튼 이슈](https://github.com/likelion-project-README/README/wiki/README-8.%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85_%ED%83%AD%EB%A9%94%EB%89%B4-%ED%94%84%EB%A1%9C%ED%95%84-%EB%B2%84%ED%8A%BC-%EC%9D%B4%EC%8A%88)

- [프로필 수정 이슈](https://github.com/likelion-project-README/README/wiki/README-8.%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85_%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95-%EC%9D%B4%EC%8A%88)

<br>

## 9. 개선 목표

- API 모듈화 : API를 불러오는 코드의 반복이 많아 모듈화할 예정
- lighthouse Performance 증진
    - 모든 페이지에서 특히 Best Practices & SEO 점수는 90~100으로 우수
    - Performance 점수가 대체적으로 미흡한 문제
    
    ![KakaoTalk_Photo_2023-01-04-16-55-30](https://user-images.githubusercontent.com/112460466/210591134-09bf8efd-3c34-4b99-a3d7-895ca99e1457.png)
    
- **23-01-17 성능 개선 내용**
    
    ![성능개선 후](https://user-images.githubusercontent.com/106502312/212872369-7ceeb2cf-d551-41d2-bfb0-01e35e9903fe.png)
    
    - 이미지 최적화
        - `<img>` 요소에 `width` , `height` 속성값을 명시해 불필요한 Reflow를 방지했습니다.
        - browser-image-compression 라이브러리를 사용해 유저가 업로드하는 이미지를 압축했습니다.
        - Intersection Observer API를 사용해 Lazy Loading 기법을 적용하여 홈 피드의 게시글 이미지가 viewport 내에 들어오는 순간 로딩되도록 변경했습니다.
    - 웹폰트 최적화
        - WOFF2 포맷을 추가하고 가장 우선적으로 적용되도록 선언했습니다.
        - 서브셋 폰트로 교체해 용량을 줄였습니다.
    
<br>

## 10. 프로젝트 후기

### 🍊 고지연

깃헙을 통한 협업에 익숙해지는 것, 서로 감정 상하지 않고 무사히 마무리하는 것이 1차적인 목표였어서 항상 이 부분을 명심하면서 작업했습니다.
각자 페이지를 작업하고 합치는 과정에서 마주친 버그들이 몇 있었는데, 시간에 쫓기느라 해결하기에 급급해서 제대로 트러블슈팅 과정을 기록하지 못한 게 살짝 아쉬운 부분으로 남습니다. 그래도 2022년 한 해 동안 가장 치열하게 살았던 한 달인 것 같습니다. 조원들 모두에게 고생했다고 전하고 싶습니다🧡

<br>

### 👻 김민제

여러모로 많은 것들을 배울 수 있었던 한 달이었습니다. 혼자서는 할 수 없었던 일이라는 것을 너무 잘 알기에 팀원들에게 정말 감사하다는 말 전하고 싶습니다. 개인적으로 아쉬웠던 부분은 기한 내에 기능을 구현하는 데에만 집중하면서 트러블 슈팅이나 새로 배웠던 것들을 체계적으로 기록하지 못했다는 점입니다. 이렇게 느낀 바가 있으니 이후의 제가 잘 정리하면서 개발할 거라 믿습니다… 하하 다들 수고하셨습니다!!!!

<br>

### 😎 양희지

팀 프로젝트 시작에 앞서 초기 설정을 진행하며 체계적인 설계의 중요성을 느꼈습니다. 앞으로는 점점 더 체계적이고 효율적으로 프로젝트를 진행할 수 있도록 발전하고 싶습니다.
정규 수업 직후에 프로젝트를 진행하면서 배운 내용을 직접 구현하는 과정이 어색했지만 어떤 부분이 부족한지 알 수 있는 기회였습니다. 스스로 최대한 노력해보고 팀원들과 함께 해결해 나가면서 협업의 장점을 체감할 수 있었습니다. 하지만 빠르게 작업을 진행하면서 팀원들과 함께 해결한 이슈가 어떤 이슈이며 어떻게 해결했는지에 대해 자세히 작성하지 못한 것이 아쉽습니다.
’멋쟁이 사자처럼’이라는 같은 목표를 가진 집단에서 프로젝트에 함께할 수 있는 소중한 경험이었습니다. 함께 고생한 조원들 모두 고생하셨습니다! 앞으로도 화이팅해서 함께 목표를 이뤄가고 싶습니다.

<br>

### 🐬 지창언

컨벤션을 정하는 것부터 Readme 파일 작성까지 전 과정을 진행하려니 처음 생각보다 많은 에너지를 썼어요. 좋은 의미로 많이 썼다기보다, 제 능력을 십분 발휘하지 못해서 아쉬움이 남는 쪽입니다. 개발한다고 개발만 해서는 안 된다는 것을 몸소 느껴보는 기간이었던 것 같습니다. 이번 기회로 프로젝트를 진행하면서, 제가 잘하는 점과 부족한 점을 확실하게 알고 가는 건 정말 좋습니다. 기술적인 부분에 있어서는 리액트의 컴포넌트화가 주는 장점을 알았습니다. 조금 느린 개발이 되었을지라도 코드 가독성 부분에 있어서 좋았고, 오류가 발생해도 전체가 아닌 오류가 난 컴포넌트와 근접한 컴포넌트만 살펴보면 수정할 수 있는 부분이 너무 편했습니다. 모두 고생 참 많으셨고 리팩토링을 통해 더 나은 프로젝트 완성까지 화이팅입니다.
