/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_List.js';
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
                iStr.push('<li>');
                iStr.push(itemRenderResult);
                iStr.push('</li>');
                return iStr.join('');
            }
            ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
            ms_outHtml.push(''
,'        <ul class="gt-List">'
,''
,'            ', ctx.RenderGroups(ctx) ,''
,'        </ul>'
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
function RegisterTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("GlittertindList", DisplayTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_List.js", DisplayTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3);
}
////
}
RegisterTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Control_List.js"), RegisterTemplate_dadb6ced1b2d4e87844c841ea4a5c8e3);
}