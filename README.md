## 📃 개요

- 서비스명: 게이머들의 음성 채팅 커뮤니티 VOG
- 주제: 게이머간의 자유로운 
- 목표: 게임을 함께 하고 싶은 유저 간의 커뮤니티 서비스 및 음성(+텍스트) 채팅 서비스 제공
- [서비스 URL](https://talkgg.online/)

<br />

## 👪 팀원 소개

**윤태경**
- Front-End, 기획, 디자인
- Gmail : origin1508@gmail.com
- Github : [@origin1508](https://github.com/origin1508)

**황현성**
- Back-End, 기획, 디자인
- Gmail : bolton7425@gmail.com
- Github : [@iHateAI](https://github.com/iHateAI)

## 서비스 기능

1. 

## 서비스 디자인

- 디자인 보러가기: https://www.figma.com/file/IjqWsoAxIe6KCYpaByLCrB/Untitled

<br />

## 🔧 기술 스택


### Front-End

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-0AC18E?style=for-the-badge&logo=Axios&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-2962FF?style=for-the-badge&logo=Recoil&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Emotion](https://img.shields.io/badge/Emotion-%23006f5c.svg?style=for-the-badge&logo=Emotion&logoColor=FF6719)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![webRTC](https://img.shields.io/badge/webRTC-B59A30?style=for-the-badge&logo=webRTC&logoColor=white)

### Back-End

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![typeORM](https://img.shields.io/badge/typeORM-B59A30?style=for-the-badge&logo=typeORM&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<br />

## 📐 프로젝트 아키텍처

![fawg3](https://user-images.githubusercontent.com/81323697/232329209-f5c4d720-a06d-4b44-b8bb-908e369f18f6.svg)

<br />

## 📁 프로젝트 소스 구조

### Front-End
```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜chat.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜community.ts
 ┃ ┣ 📜friend.ts
 ┃ ┣ 📜like.ts
 ┃ ┗ 📜user.ts
 ┣ 📂components
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜Auth.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Chat
 ┃ ┃ ┣ 📂ChatEdit
 ┃ ┃ ┃ ┣ 📜ChatEdit.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂ChatRoom
 ┃ ┃ ┃ ┣ 📜ChatMember.tsx
 ┃ ┃ ┃ ┣ 📜ChatMessage.tsx
 ┃ ┃ ┃ ┣ 📜ChatRoom.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂RoomList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜RoomList.tsx
 ┃ ┃ ┣ 📜Chat.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂Audio
 ┃ ┃ ┃ ┣ 📜Audio.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂ErrorMessage
 ┃ ┃ ┃ ┣ 📜ErrorMessage.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜Input.tsx
 ┃ ┃ ┣ 📂Loading
 ┃ ┃ ┃ ┣ 📜Circle.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┣ 📂MyPageCard
 ┃ ┃ ┃ ┣ 📜Left.tsx
 ┃ ┃ ┃ ┗ 📜Right.tsx
 ┃ ┃ ┣ 📂Search
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜Search.tsx
 ┃ ┃ ┣ 📂Textarea
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂UserCard
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜UserCard.tsx
 ┃ ┣ 📂Community
 ┃ ┃ ┣ 📂Contents
 ┃ ┃ ┃ ┣ 📜Contents.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📂Comments
 ┃ ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentEdit.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Reply.tsx
 ┃ ┃ ┃ ┣ 📂Post
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Post.tsx
 ┃ ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Edit
 ┃ ┃ ┃ ┣ 📜Edit.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜Navigation.tsx
 ┃ ┃ ┣ 📜Community.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ErrorBoundary
 ┃ ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Friend
 ┃ ┃ ┣ 📜Friend.tsx
 ┃ ┃ ┣ 📜FriendContext.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂icons
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜MainLayout.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┗ 📜OAuthLogin.tsx
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📂MyPageCards
 ┃ ┃ ┃ ┣ 📜DeleteAccount.tsx
 ┃ ┃ ┃ ┣ 📜History.tsx
 ┃ ┃ ┃ ┣ 📜NicknameEdit.tsx
 ┃ ┃ ┃ ┗ 📜ProfilePicEdit.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜MyPage.tsx
 ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┣ 📂Pagination
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┣ 📂SelectGame
 ┃ ┃ ┣ 📜GameCard.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SelectGame.tsx
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜Sidebar.tsx
 ┃ ┣ 📂SignUp
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂Socket
 ┃ ┃ ┣ 📜ChatSocket.tsx
 ┃ ┃ ┣ 📜DeviceSetting.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜Socket.tsx
 ┃ ┣ 📂Toast
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜Toast.tsx
 ┃ ┃ ┗ 📜ToastText.tsx
 ┃ ┗ 📂UserProfileModal
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜UserProfileModal.tsx
 ┣ 📂constants
 ┃ ┣ 📜Auth.ts
 ┃ ┣ 📜friend.ts
 ┃ ┣ 📜games.ts
 ┃ ┣ 📜nav.ts
 ┃ ┗ 📜search.ts
 ┣ 📂hooks
 ┃ ┣ 📜useChatEditForm.ts
 ┃ ┣ 📜useChatState.ts
 ┃ ┣ 📜useFriendState.ts
 ┃ ┣ 📜useInfiniteScroll.ts
 ┃ ┣ 📜useLoadingState.ts
 ┃ ┣ 📜useMediaDevice.ts
 ┃ ┣ 📜useModal.ts
 ┃ ┣ 📜useNicknameEditForm.ts
 ┃ ┣ 📜usePagination.ts
 ┃ ┣ 📜useProfilePicEditForm.ts
 ┃ ┣ 📜useSignUpForm.ts
 ┃ ┣ 📜useToast.ts
 ┃ ┣ 📜useUserProfileState.ts
 ┃ ┣ 📜useUserState.ts
 ┃ ┗ 📜useWebRTC.ts
 ┣ 📂pages
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📂login
 ┃ ┃ ┃ ┗ 📜[provider].tsx
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜[id].tsx
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜[id].tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜[id].tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜login.tsx
 ┃ ┣ 📜select-game.tsx
 ┃ ┣ 📜sign-up.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┗ 📜_document.tsx
 ┣ 📂public
 ┃ ┣ 📂image
 ┃ ┃ ┣ 📜blank_profile.png
 ┃ ┃ ┣ 📜home.jpg
 ┃ ┃ ┣ 📜LeagueofLegends.jpg
 ┃ ┃ ┣ 📜logo_kakao.png
 ┃ ┃ ┣ 📜logo_naver.png
 ┃ ┃ ┣ 📜LoL_logo.png
 ┃ ┃ ┣ 📜naver.png
 ┃ ┃ ┣ 📜valorant.jpg
 ┃ ┃ ┣ 📜valorant_jett.jpg
 ┃ ┃ ┣ 📜valorant_logo.png
 ┃ ┃ ┣ 📜valorant_logo2.png
 ┃ ┃ ┗ 📜yasou.webp
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜thirteen.svg
 ┃ ┗ 📜vercel.svg
 ┣ 📂recoil
 ┃ ┣ 📂atoms
 ┃ ┃ ┣ 📜chatState.ts
 ┃ ┃ ┣ 📜friendState.ts
 ┃ ┃ ┣ 📜loadingState.ts
 ┃ ┃ ┣ 📜selectedGameState.ts
 ┃ ┃ ┣ 📜toastState.ts
 ┃ ┃ ┣ 📜userProfileState.ts
 ┃ ┃ ┗ 📜userState.ts
 ┃ ┗ 📂selectors
 ┃ ┃ ┗ 📜loginState.ts
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.tsx
 ┣ 📂types
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜chat.ts
 ┃ ┣ 📜community.ts
 ┃ ┣ 📜friend.ts
 ┃ ┣ 📜myPage.ts
 ┃ ┗ 📜twin.d.ts
 ┗ 📂utils
 ┃ ┣ 📜customAxios.ts
 ┃ ┣ 📜getGameLogo.ts
 ┃ ┣ 📜getTitle.ts
 ┃ ┣ 📜imageResize.ts
 ┃ ┣ 📜localStorage.ts
 ┃ ┣ 📜sessionStorage.ts
 ┃ ┣ 📜socketClient.ts
 ┃ ┣ 📜timeDifference.ts
 ┃ ┣ 📜tokenManager.ts
 ┃ ┗ 📜validatePassword.ts
```

### Back-End
```
📦src
 ┣ 📂auth
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜login.auth.dto.ts
 ┃ ┃ ┗ 📜return.auth.dto.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┗ 📜auth.guard.ts
 ┃ ┣ 📜auth.controller.spec.ts
 ┃ ┣ 📜auth.controller.ts
 ┃ ┣ 📜auth.module.ts
 ┃ ┣ 📜auth.repository.ts
 ┃ ┣ 📜auth.service.spec.ts
 ┃ ┗ 📜auth.service.ts
 ┣ 📂chats
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create.chat.dto.ts
 ┃ ┃ ┣ 📜get.chat.dto.ts
 ┃ ┃ ┣ 📜return.chat.dto.ts
 ┃ ┃ ┗ 📜socket.request.dto.ts
 ┃ ┣ 📜chats.controller.spec.ts
 ┃ ┣ 📜chats.controller.ts
 ┃ ┣ 📜chats.entity.ts
 ┃ ┣ 📜chats.gateway.spec.ts
 ┃ ┣ 📜chats.gateway.ts
 ┃ ┣ 📜chats.module.ts
 ┃ ┣ 📜chats.repository.ts
 ┃ ┣ 📜chats.service.spec.ts
 ┃ ┗ 📜chats.service.ts
 ┣ 📂comments
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜get.comment.dto.ts
 ┃ ┃ ┣ 📜modify.comment.dto.ts
 ┃ ┃ ┣ 📜register.comment.dto.ts
 ┃ ┃ ┗ 📜return.comment.dto.ts
 ┃ ┣ 📜comments.controller.spec.ts
 ┃ ┣ 📜comments.controller.ts
 ┃ ┣ 📜comments.entity.ts
 ┃ ┣ 📜comments.module.ts
 ┃ ┣ 📜comments.repository.ts
 ┃ ┣ 📜comments.service.spec.ts
 ┃ ┗ 📜comments.service.ts
 ┣ 📂common
 ┃ ┣ 📂filters
 ┃ ┃ ┗ 📜http-exception.filter.ts
 ┃ ┣ 📂interceptors
 ┃ ┃ ┗ 📜success.interceptor.ts
 ┃ ┗ 📂middlewares
 ┃ ┃ ┣ 📜logger.middleware.spec.ts
 ┃ ┃ ┗ 📜logger.middleware.ts
 ┣ 📂friend
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create.friend.dto.ts
 ┃ ┃ ┣ 📜delete.friend.dto.ts
 ┃ ┃ ┗ 📜return.friend.dto.ts
 ┃ ┣ 📜friend.controller.spec.ts
 ┃ ┣ 📜friend.controller.ts
 ┃ ┣ 📜friend.entity.ts
 ┃ ┣ 📜friend.module.ts
 ┃ ┣ 📜friend.repository.ts
 ┃ ┣ 📜friend.service.spec.ts
 ┃ ┗ 📜friend.service.ts
 ┣ 📂like
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create.like.dto.ts
 ┃ ┃ ┣ 📜delete.like.dto.ts
 ┃ ┃ ┗ 📜result.like.dto.ts
 ┃ ┣ 📜like.controller.spec.ts
 ┃ ┣ 📜like.controller.ts
 ┃ ┣ 📜like.module.ts
 ┃ ┣ 📜like.repository.ts
 ┃ ┣ 📜like.service.spec.ts
 ┃ ┗ 📜like.service.ts
 ┣ 📂posts
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create.post.dto.ts
 ┃ ┃ ┣ 📜get.post.dto.ts
 ┃ ┃ ┣ 📜modify.post.dto.ts
 ┃ ┃ ┗ 📜return.post.dto.ts
 ┃ ┣ 📜posts.controller.spec.ts
 ┃ ┣ 📜posts.controller.ts
 ┃ ┣ 📜posts.entity.ts
 ┃ ┣ 📜posts.module.ts
 ┃ ┣ 📜posts.repository.ts
 ┃ ┣ 📜posts.service.spec.ts
 ┃ ┗ 📜posts.service.ts
 ┣ 📂replies
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜modify.reply.dto.ts
 ┃ ┃ ┣ 📜register.reply.dto.ts
 ┃ ┃ ┗ 📜return.reply.dto.ts
 ┃ ┣ 📜replies.controller.spec.ts
 ┃ ┣ 📜replies.controller.ts
 ┃ ┣ 📜replies.entity.ts
 ┃ ┣ 📜replies.module.ts
 ┃ ┣ 📜replies.repository.ts
 ┃ ┣ 📜replies.service.spec.ts
 ┃ ┗ 📜replies.service.ts
 ┣ 📂uploads
 ┃ ┣ 📜uploads.controller.spec.ts
 ┃ ┣ 📜uploads.controller.ts
 ┃ ┣ 📜uploads.module.ts
 ┃ ┣ 📜uploads.service.spec.ts
 ┃ ┗ 📜uploads.service.ts
 ┣ 📂users
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create.user.dto.ts
 ┃ ┃ ┣ 📜modify.user.dto.ts
 ┃ ┃ ┗ 📜return.user.dto.ts
 ┃ ┣ 📜users.controller.spec.ts
 ┃ ┣ 📜users.controller.ts
 ┃ ┣ 📜users.entity.ts
 ┃ ┣ 📜users.module.ts
 ┃ ┣ 📜users.repository.ts
 ┃ ┣ 📜users.service.spec.ts
 ┃ ┗ 📜users.service.ts
 ┣ 📜app.controller.spec.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts
```

<br />

## DB 
