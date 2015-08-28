/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_d7599402e1f74b4d8a0da63c8be94642(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_d7599402e1f74b4d8a0da63c8be94642.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_Table_ExperienceLog.js';
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
function RegisterTemplate_d7599402e1f74b4d8a0da63c8be94642() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("GlittertindTableExperienceLog", DisplayTemplate_d7599402e1f74b4d8a0da63c8be94642);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_Table_ExperienceLog.js", DisplayTemplate_d7599402e1f74b4d8a0da63c8be94642);
}
////
}
RegisterTemplate_d7599402e1f74b4d8a0da63c8be94642();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_Table_ExperienceLog.js"), RegisterTemplate_d7599402e1f74b4d8a0da63c8be94642);
}