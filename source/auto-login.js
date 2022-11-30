import optionsStorage from "./options-storage.js";
import * as page from "./page-decision.js";

Windows.onload = main();

async function main() {
	console.debug("start");
	console.debug(
		page.isPCLoginPage(),
		page.isPCAskReLogin(),
		page.isSPLoginPage(),
		page.isSPAskReLogin()
	);

	if (isPasswordMissing()) {
		console.debug("password missing");
	} else {
		loginProcess();
	}
}
async function loginProcess() {
	const options = await optionsStorage.getAll();
	const userName = options.userName;
	const password = options.password;
	// PC自動ログイン
	if (page.isPCLoginPage()) {
		console.debug("PCLogin");
		document.querySelector("#loginForm\\:userId").value = userName;
		document.querySelector("#loginForm\\:password").value = password;
		document.querySelector("#loginForm\\:loginButton").click();
	}

	// PC再ログイン時の自動button押下
	if (page.isPCAskReLogin()) {
		console.debug("PCReLogin");
		document.querySelectorAll(".ui-button")[0].click();
	}

	// スマホ自動ログイン
	if (page.isSPLoginPage()) {
		console.log("SPLogin");
		document.querySelector("#pmPage\\:loginForm\\:userId_input").value =
			userName;
		// Id="pmPage\\:loginForm\\:password"が二つあるのでnameから取得
		document.querySelector('[name="pmPage\\:loginForm\\:password"]').value =
			password;
		document.querySelector("#pmPage\\:loginForm\\:j_idt38").click();
	}

	// スマホ再ログイン時の自動button押下
	if (page.isSPAskReLogin()) {
		// ボタンにidが割り振られていないのでtypeから取得
		document.querySelector('[type="submit"]').click();
	}
}

function isPasswordMissing() {
	if (!document.querySelectorAll(".ui-messages-error")[0]) {
		return false;
	}

	const errorMessage = document.querySelectorAll(".ui-messages-error")[0];
	return (
		errorMessage &&
		"textContent" in errorMessage &&
		errorMessage.textContent ===
			"ユーザＩＤまたはパスワードが正しくありません。"
	);
}
