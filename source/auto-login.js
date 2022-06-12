console.debug('start');
console.debug(isPCLoginPage(), isPCAskReLogin(), isAskReLogin());

const userName = 'A22DC030';
const password = '*****';

// PC自動ログイン
if (isPCLoginPage()) {
	safety();
	console.debug('PCLogin');
	document.querySelector('#loginForm\\:userId').value = userName;
	document.querySelector('#loginForm\\:password').value = password;
	document.querySelector('#loginForm\\:loginButton').click();
}

// PC再ログイン時の自動button押下
if (isPCAskReLogin()) {
	safety();
	console.debug('PCReLogin');
	document.querySelectorAll('.ui-button')[0].click();
}

// スマホ自動ログイン
if (isSPLoginPage()) {
	safety();
	console.log('SPLogin');
	document.querySelector('#pmPage\\:loginForm\\:userId_input').value = userName;
	// Id="pmPage\\:loginForm\\:password"が二つあるのでnameから取得
	document.querySelector('[name="pmPage\\:loginForm\\:password"]').value
      = password;
	document.querySelector('#pmPage\\:loginForm\\:j_idt38').click();
}

// スマホ再ログイン時の自動button押下

if (isSPAskReLogin()) {
	safety();
	// ボタンにidが割り振られていないのでtypeから取得
	document.querySelector('[type="submit"]').click();
}

// ページ判定関数
function isPCLoginPage() {
	return document.querySelector('#loginForm\\:userId')
      && document.querySelector('#loginForm\\:password')
      && document.querySelector('#loginForm\\:loginButton');
}

function isPCAskReLogin() {
	return isAskReLogin() && document.querySelectorAll('.ui-button')[0];
}

function isSPLoginPage() {
	const userId = document.querySelector('#pmPage\\:loginForm\\:userId_input');
	// Id="pmPage\\:loginForm\\:password"が二つあるので保留
	// var password = document.getElementById('pmPage\\:loginForm\\:password');
	const loginButton = document.querySelector('#pmPage\\:loginForm\\:j_idt38');
	return userId /* && password */ && loginButton;
}

function isSPAskReLogin() {
	return isAskReLogin() && document.querySelector('[type="submit"]');
}

function isAskReLogin() {
	if (document.querySelectorAll('.innerInfo').length > 0) {
		return false;
	}

	return document.querySelectorAll('.innerInfo')[0].textContent
      === '長時間操作が行われなかったため、自動的にログアウトされました。\nログイン画面より再度ログイン認証を行ってください。';
}

function safety() {
	const count = localStorage.getItem('dsc');
	if (count < 0) {
		throw new Error('stopper count overflow');
	} else {
		localStorage.setItem('dsc', count - 1);
	}
}
