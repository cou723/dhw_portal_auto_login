import * as page from './page_decision.js';

console.debug('start');
console.debug(
    page.isPCLoginPage(), page.isPCAskReLogin(), page.isSPLoginPage(),
    page.isSPAskReLogin());

const userName = 'A22DC030';
const password = '*****';

if (isPasswordMissing()) {
  console.debug('password missing');
  return;
}
login_process();

function login_process() {
  // PC自動ログイン
  if (page.isPCLoginPage()) {
    console.debug('PCLogin');
    document.querySelector('#loginForm\\:userId').value = userName;
    document.querySelector('#loginForm\\:password').value = password;
    document.querySelector('#loginForm\\:loginButton').click();
  }

  // PC再ログイン時の自動button押下
  if (page.isPCAskReLogin()) {
    console.debug('PCReLogin');
    document.querySelectorAll('.ui-button')[0].click();
  }

  // スマホ自動ログイン
  if (page.isSPLoginPage()) {
    console.log('SPLogin');
    document.querySelector('#pmPage\\:loginForm\\:userId_input').value =
        userName;
    // Id="pmPage\\:loginForm\\:password"が二つあるのでnameから取得
    document.querySelector('[name="pmPage\\:loginForm\\:password"]').value =
        password;
    document.querySelector('#pmPage\\:loginForm\\:j_idt38').click();
  }

  // スマホ再ログイン時の自動button押下

  if (page.isSPAskReLogin()) {
    // ボタンにidが割り振られていないのでtypeから取得
    document.querySelector('[type="submit"]').click();
  }
}
function isPasswordMissing() {
  if (!document.getElementsByClassName('ui-messages-error')[0]) return false;
  const error = document.getElementsByClassName('ui-messages-error')[0];
  return 'textContent' in error &&
      error.textContent === 'ユーザＩＤまたはパスワードが正しくありません。';
}