const PC_RELOGIN_INFO =
    '\n                                        \n                                        長時間操作が行われなかったため、自動的にログアウトされました。ログイン画面より再度ログイン認証を行ってください。\n                                    ';

const SP_RELOGIN_INFO =
    '長時間操作が行われなかったため、自動的にログアウトされました。\nログイン画面より再度ログイン認証を行ってください。';


// ページ判定関数
// PC
export function isPCLoginPage() {
  return document.querySelector('#loginForm\\:userId') &&
      document.querySelector('#loginForm\\:password') &&
      document.querySelector('#loginForm\\:loginButton');
}

export function isPCAskReLogin() {
  if (!document.querySelectorAll('.innerInfo')[0]) {
    return false;
  }
  const info = document.querySelector('.innerInfo')[0];

  return textContent in info && info.textContent === PC_RELOGIN_INFO &&
      document.querySelectorAll('.ui-button')[0];
}

// スマホ
export function isSPLoginPage() {
  const userId = document.querySelector('#pmPage\\:loginForm\\:userId_input');
  // Id="pmPage\\:loginForm\\:password"が二つあるので保留
  // var password = document.getElementById('pmPage\\:loginForm\\:password');
  const loginButton = document.querySelector('#pmPage\\:loginForm\\:j_idt38');
  return userId /* && password */ && loginButton;
}

export function isSPAskReLogin() {
  if (!document.querySelectorAll('.innerInfo')[0]) {
    return false;
  }
  const info = document.querySelector('.innerInfo')[0];

  // buttonにidがないためtype=submitで判定
  return 'textContent' in info && info.textContent === SP_RELOGIN_INFO &&
      document.querySelector('[type="submit"]');
}
