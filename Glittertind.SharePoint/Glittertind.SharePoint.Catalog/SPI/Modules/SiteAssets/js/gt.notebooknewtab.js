var GT = GT || {};
GT.Common = GT.Common || {};

function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;
    prior.parentNode.insertBefore(script, prior);

    script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if (!isAbort) { if (callback) callback(); }
        }
    };

    script.src = source;
}

GT.Common.NotebookLinkInNewTab = function () {
    // Sets target _blank on notebook link
    GT.jQuery("div[id*='V4QuickLaunchMenu'] a.menu-item").filter(function () { return GT.jQuery(this).find("span.menu-item-text").text() == "Notebook"; }).attr("target", "_blank");

    // Need to remove the onclick event for the target _blank to work properly
    GT.jQuery("div[id*='V4QuickLaunchMenu'], div[id*='TopNavigationMenu']").removeAttr("onclick");
}

_spBodyOnLoadFunctions.push(function () {
    if (GT.jQuery) {
        GT.Common.NotebookLinkInNewTab();
    } else {
        getScript(_spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/gt/js/jquery-1.11.1.min.js", function () {
            if (GT.jQuery === undefined) GT.jQuery = jQuery.noConflict(true);

            GT.Common.NotebookLinkInNewTab();
        });
    }
})
