var xhr = new XMLHttpRequest();
var url = location.href.substring(0, location.href.indexOf('/commit')) + '/pulls?q=' + document.getElementsByClassName("user-select-contain")[0].innerText;
var prIcon = '<svg class="octicon octicon-git-pull-request UnderlineNav-octicon d-none d-sm-inline" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></svg>';

document
    .getElementsByClassName('commit-meta')[0]
    .insertAdjacentHTML('beforebegin', '<div class="commit-pr-list"></div>');

xhr.open("GET", url, true);
xhr.responseType = "document";
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var aObj = xhr.response.getElementsByTagName('a');
            var matchObj = new RegExp("issue_*");
            var matchCnt = 0;
            for (i = 0; i < aObj.length; i++) {
                if (aObj[i].id.match(matchObj)) {
                    matchCnt++;
                    document
                        .getElementsByClassName('commit-pr-list')[0]
                        .insertAdjacentHTML('beforeend', '<div class="commit-pr">' + aObj[i].parentNode.previousElementSibling.firstElementChild.outerHTML + aObj[i].outerHTML + '</div>');
                }
            }
            if (matchCnt === 0) {
                document
                    .getElementsByClassName('commit-pr-list')[0]
                    .insertAdjacentHTML('beforeend', '<div class="commit-pr">PR Not Found</div>');
            }
        } else {
            document
                .getElementsByClassName('commit-pr-list')[0]
                .insertAdjacentHTML('beforeend', '<div class="commit-pr">PRの取得に失敗しました</div>');
        }
    }
};
xhr.onerror = function (e) {
    document
        .getElementsByClassName('commit-pr-list')[0]
        .insertAdjacentHTML('beforeend', '<div class="commit-pr">PRの取得に失敗しました</div>');
};
xhr.send(null);
