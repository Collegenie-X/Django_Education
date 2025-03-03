declare global {
  interface WindowEventMap {
    userLoggedIn: CustomEvent<{ email: string }>;
  }
}

// 이 파일을 모듈로 만들기 위해 다음을 추가합니다.
export {};
