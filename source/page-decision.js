const RE_LOGIN_INFO
	= '長時間操作が行われなかったため、自動的にログアウトされました。ログイン画面より再度ログイン認証を行ってください。';

function isReLoginMessage(info) {
	return info.replace(/\n/g, '').replace(/ /g, '') === RE_LOGIN_INFO;
}

// ページ判定関数
// PC
export function isPCLoginPage() {
	return (
		document.querySelector('#loginForm\\:userId')
		&& document.querySelector('#loginForm\\:password')
		&& document.querySelector('#loginForm\\:loginButton')
	);
}

export function isPCAskReLogin() {
	const info = document.querySelectorAll('.innerInfo')[0];
	if (!info) {
		return false;
	}

	return (
		'textContent' in info
		&& isReLoginMessage(info.textContent)
		&& document.querySelectorAll('.ui-button')[0]
	);
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
	if (!document.querySelector('.innerInfo')) {
		return false;
	}

	const info = document.querySelector('.innerInfo');

	// Buttonにidがないためtype=submitで判定
	return (
		info
		&& 'textContent' in info
		&& isReLoginMessage(info.textContent)
		&& document.querySelector('[type="submit"]')
	);
}
