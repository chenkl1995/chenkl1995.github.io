// ==UserScript==
// @name         #C7EDCC
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @updateURL    https://github.com/chenkl1995/chenkl1995.github.io/tree/master/helps/%23C7EDCC.user.js
// @downloadURL  https://github.com/chenkl1995/chenkl1995.github.io/tree/master/helps/%23C7EDCC.user.js
// @description  https://greasyfork.org/zh-CN;https://github.com/quoid/userscripts#api;
// @author       chenkl1995
// @match        *://*/*
// @exclude-match:
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM.addStyle
// ==/UserScript==
(function() {
    var add_css = function (css) {
        if (typeof GM_addStyle != "undefined") {
            GM_addStyle(css);
        } else if (typeof GM.addStyle != "undefined") {
            GM.addStyle(css);
        } else {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                heads[0].appendChild(node);
            } else {
                // no head yet, stick it whereever
                document.documentElement.appendChild(node);
            }
        }
    };

    // var ele = "body,div,span,section,article,ul,li,nav";
    // let ele = "body,div,section,article,ul,li,nav";
    let ele_arr = [
        "body",
        "div",
        // "span",
        "section",
        "article",
        "ul",
        "li",
        "nav",
        "h1", "h2", "h3", "h4", "h5", "h6",
        // "a",
    ]

    // https://github.com/AirBashX/UserScript
    // https://greasyfork.org/zh-CN/scripts/440871-%E9%AA%9A%E6%89%B0%E6%8B%A6%E6%88%AA/code
    const websites = [
        {
			name: "百度搜索",
			url: ".baidu.com",
			items: [
				// 百度APP
                "#page-copyright",
				// "#page-copyright :nth-last-child(1)",
			],
            dicts: {
                "div": "div:not(.c-img):not(.c-img-info-mask):not(.c-img-around-mask)",
            }
		},
    ]
    for (let website of websites) {
		if (location.href.indexOf(website.url) != -1) {
            // 替换
            if (website.dicts) {
                for (let key in website.dicts) {
                    ele_arr = ele_arr.filter(e => e != key)
                    ele_arr.push(website.dicts[key]);
                }
            }

			//隐藏/拦截骚扰元素
			if (website.items) {
				for (let item of website.items) {
                    let css = item + "{display: none !important}";
                    add_css(css);
				}
			}
            /*
			//修复移动版页面不允许滑动
			if (website.overflow) {
				let cssVlaue = document.createElement("style");
				cssVlaue.innerText = "body{overflow: unset !important}";
				document.head.appendChild(cssVlaue);
			}
			//执行额外方案
			if (website.func) {
				website.func();
			}
            */
		}
	}

    let ele = ele_arr.join(',');
    // console.log(ele);
    var bg_css;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        bg_css = ele + " {background: #C7EDCC !important;}";
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        bg_css = ele + " {background: #121212 !important; color: #F8F8F8 !important;}";
    }
    add_css(bg_css);
})();