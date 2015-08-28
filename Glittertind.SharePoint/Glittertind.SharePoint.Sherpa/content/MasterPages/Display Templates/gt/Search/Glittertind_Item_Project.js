/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_2aac3980e8fa456284e480663aaac1f8(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_2aac3980e8fa456284e480663aaac1f8.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':['Path'], 'Title':['Title'], 'ProjectManager':['GtProjectManagerOWSUSER'], 'ProjectOwner':['GtProjectOwnerOWSUSER'], 'ProjectPhase':['RefinableString52']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
            var url = $getItemValue(ctx, "Path");
            var title = $getItemValue(ctx, "Title");
            var projectManager = $getItemValue(ctx, "ProjectManager");
            var projectOwner = $getItemValue(ctx, "ProjectOwner");
            var projectPhase = $getItemValue(ctx, "ProjectPhase");
            var projectPhaseDisplayMarkup = GT.Project.GetPhaseLogoMarkup(projectPhase.toString());
        ms_outHtml.push(''
,'        <div class="gt-projectItem">'
,'            ', projectPhaseDisplayMarkup ,''
,'            <h2><a href="', url ,'">', title ,'</a></h2>'
,'            <div>Project Manager: ', projectManager ,'</div>'
,'            <div>Project Owner: ', projectOwner ,'</div>'
,'        </div>'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_2aac3980e8fa456284e480663aaac1f8() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("GlittertindProject", DisplayTemplate_2aac3980e8fa456284e480663aaac1f8);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project.js", DisplayTemplate_2aac3980e8fa456284e480663aaac1f8);
}
////
}
RegisterTemplate_2aac3980e8fa456284e480663aaac1f8();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project.js"), RegisterTemplate_2aac3980e8fa456284e480663aaac1f8);
}