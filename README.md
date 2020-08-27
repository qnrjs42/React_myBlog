리액트로 나만의 블로그 만들기

- 백엔드
  express : 서버 프레임 워크
  cors : 여러 서버 자원들을 자유롭게 자원을 가져옴
  dotenv : 중요정보 노출 방지
  hpp, helmet : 서버상의 보안상 취약점
  moment: 몽고DB는 UTC라는 시간대 사용 글 쓰는 시간대 통일하기 위해 사용

babel : 옛날 브라우저와 최신 브라우저에서 동일하게 동작하게 도와줌
babel/cli : 터미널에서 사용 가능
/core : ES6 최신 문법을 미리 설정
/node , /preset-env, babel-loader : 모르겠다

/polyfill : 최신문법 사용할 수 있게 도와줌

morgan : 서버 로그
nodemon: 파일 저장 시 서버 자동 재시작

// 최신 문법을 쓰겠다고 설정
package.json -> "dev": "nodemon ./server/server.js --exec babel-node"
.babelrc -> "presets": ["@babel/preset-env"]

.env 파일에서 몽고DB 설정 저장,
server/config/index.js 파일에서 .env 불러와 모듈화
