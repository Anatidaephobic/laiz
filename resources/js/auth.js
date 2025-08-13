// Simple client-side auth. This only obfuscates content and is NOT secure.
// Change AUTH_PASSWORD below.

(function () {
	var AUTH_KEY = 'site_auth_ok';
	var AUTH_PASSWORD = 'LaizGuimaraes'; // TODO: change this password

	function isLoginPage() {
		var path = window.location.pathname || '';
		return /\/?login\.html$/i.test(path);
	}

	function isAuthorized() {
		try {
			return window.sessionStorage.getItem(AUTH_KEY) === '1';
		} catch (e) {
			return false;
		}
	}

	function buildLoginUrl() {
		var path = window.location.pathname || '';
		var loginRelative = path.indexOf('/content/') !== -1 ? '../login.html' : 'login.html';
		var redirectTarget = path + (window.location.search || '') + (window.location.hash || '');
		return loginRelative + '?redirect=' + encodeURIComponent(redirectTarget);
	}

	function redirectToLogin() {
		var url = buildLoginUrl();
		try { window.stop && window.stop(); } catch (e) {}
		window.location.replace(url);
	}

	// Expose minimal API for login.html
	window.__simpleAuth = {
		AUTH_KEY: AUTH_KEY,
		AUTH_PASSWORD: AUTH_PASSWORD,
		isAuthorized: isAuthorized
	};

	if (!isLoginPage() && !isAuthorized()) {
		redirectToLogin();
	}
})();


