리액트로 나만의 블로그 만들기

- 백엔드
  express : 서버 프레임 워크
  cors : 여러 서버 자원들을 자유롭게 자원을 가져옴
  dotenv : 중요정보 노출 방지
  hpp, helmet : 서버상의 보안상 취약점
  moment: 몽고DB는 UTC라는 시간대, 사용 글 쓰는 시간대 통일하기 위해 사용

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

미들웨어 동작 방법

// 글 쓰기
POST: http://localhost:7000/api/post
Headers
KEY: Content VALUE: application/json,
KEY: x-auth-token VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDhhMmQ4ZjZhYzI4MGM3NDlmZWRjNCIsImlhdCI6MTU5ODU5NTgwMCwiZXhwIjoxNTk4NTk5NDAwfQ.\_rPuZ5PFkzAfH8zELgFCskEHJnuj5TNWFrPNcx3TpnY
(토큰 복사하면 된다.)
토큰을 빼고 POST 전송 시 에러 메시지 출력

// 회원정보 확인
GET: http://localhost:7000/api/auth/user
Headers
KEY: Content VALUE: application/json,
KEY: x-auth-token VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDhhMmQ4ZjZhYzI4MGM3NDlmZWRjNCIsImlhdCI6MTU5ODU5NTgwMCwiZXhwIjoxNTk4NTk5NDAwfQ.\_rPuZ5PFkzAfH8zELgFCskEHJnuj5TNWFrPNcx3TpnY
(토큰 복사하면 된다.)

토큰 값은 매번 로그인 할 때마다 달라짐

"scripts": {
"dev": "nodemon ./server/server.js --exec babel-node --ignore './client'"
},

--ignore './client' -> 클라이언트가 변경되어도 백엔드 서버 재시작 안 함

---

- 프론트엔드

cd client
npx create-react-app .

------- 삭제 리스트 -------
App.css
App.test.js
index.css
logo.svg
serviceWorker.js
setupTests.js

---

.scss 파일은 .css 비해 변수를 사용할 수 있다.
하지만 .css 파일로 반드시 변환시켜줘야 한다.

npm i node-sass sass-loader

CKEditor5 Setting
https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

> 해당 명령 실행 시 되돌릴 수 없으니 git으로 먼저 업데이트
> cd client

npm run eject

npm i @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self

npm i raw-loader@3 @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-theme-lark @ckeditor/ckeditor5-react @ckeditor/ckeditor5-editor-classic @ckeditor/ckeditor5-essentials @ckeditor/ckeditor5-paragraph @ckeditor/ckeditor5-basic-styles

npm remove style-loader

npm i style-loader

## config/webpack.config.js - 파일 수정

// CKEitor5 Setting
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWEbpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");

( inputSourceMap: shouldUseSourceMap 검색[Ctrl + F] -> 중괄호 2개 밖에다가 입력)

// CKEitor5 Setting
{
test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: [ 'raw-loader' ]
},
{
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
use: [
{
loader: 'style-loader',
options: {
injectType: 'singletonStyleTag',
attributes: {
'data-cke': true
}
}
},
{
loader: 'postcss-loader',
options: styles.getPostCssConfig( {
themeImporter: {
themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
},
minify: true
} )
}
]
},

( 그 아래 줄 보면 test: cssRegex 아래에 코드 입력)
test: cssRegex,
// CKEditor5 Setting
exclude: [
cssModuleRegex,
/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css\$/,
],

( 위 코드 복사하고 다음 줄에 있는 exclude: cssModuleRegex, 제거, 복사한 코드에서 제거하는거 아님)

( 위 코드 입력하고 좀만 내려가서 아래 코드 복사)
test: cssModuleRegex,
// CKEditor5 Setting
exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css\$/],

( 위 코드 복사하고 좀 더 내려가면 loader: require.resolve("file-loader"), 밑에 코드 붙여넣기, exclude 코드 대체)

// CKEditor5 Setting
exclude: [
/\.(js|mjs|jsx|ts|tsx)$/,
    /\.html$/,
/\.json$/,
    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css\$/
],

---
