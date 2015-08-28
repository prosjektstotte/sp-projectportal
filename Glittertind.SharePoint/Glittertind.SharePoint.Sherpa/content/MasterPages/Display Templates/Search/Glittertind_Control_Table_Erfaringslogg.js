/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_57983b42b693469fba7131a44b07bb04(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_57983b42b693469fba7131a44b07bb04.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fgt\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table_Erfaringslogg.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
,''
);
        if (!$isNull(ctx.ClientControl) &&
            !$isNull(ctx.ClientControl.shouldRenderControl) &&
            !ctx.ClientControl.shouldRenderControl())
        {
            return "";
        }
        ctx.ListDataJSONGroupsKey = "ResultTables";

        var noResultsClassName = "ms-srch-result-noResults";

        var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl)
        {
            var iStr = [];
            iStr.push(itemRenderResult);
            return iStr.join('');
        }
        ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
        ms_outHtml.push(''
,'        <table class="gt-result-table">'
,'            <thead>'
,'                <tr>'
,'                    <th>Title</th>'
,'                    <th>Project</th>'
,'                    <th>Description</th>'
,'                    <th>Responsible</th>'
,'                    <th>Consequence</th>'
,'                    <th>Recommendation</th>'
,'                    <th>Actors</th>'
,'                </tr>'
,'            </thead>'
,'            <tbody>'
,'                ', ctx.RenderGroups(ctx) ,''
,'            </tbody>'
,'        </table>'
,''
,''
,''
,''
);
        if (ctx.ClientControl.get_shouldShowNoResultMessage())
        {
        ms_outHtml.push(''
,'        <div class="', noResultsClassName ,'">No elements to show</div>'
);
        }
        ms_outHtml.push(''
,''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_57983b42b693469fba7131a44b07bb04() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_List", DisplayTemplate_57983b42b693469fba7131a44b07bb04);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fgt\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table_Erfaringslogg.js", DisplayTemplate_57983b42b693469fba7131a44b07bb04);
}
//
    //
}
RegisterTemplate_57983b42b693469fba7131a44b07bb04();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fgt\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table_Erfaringslogg.js"), RegisterTemplate_57983b42b693469fba7131a44b07bb04);
}