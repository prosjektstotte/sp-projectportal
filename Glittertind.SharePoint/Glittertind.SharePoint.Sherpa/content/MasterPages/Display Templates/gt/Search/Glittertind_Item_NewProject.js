/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_630cf1ac460c4b80bc6ce9b08045c3f2(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_630cf1ac460c4b80bc6ce9b08045c3f2.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_NewProject.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':['Path'], 'Title':['Title'], 'ProjectManager':['GtProjectManagerOWSUSER'], 'ProjectOwner':['GtProjectOwnerOWSUSER'], 'ProjectPhase':['owstaxIdGtProjectPhase'], 'Created':['Created']};
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
            var created = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy");
            var createdTime = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy kl HH:mm:ss");
        ms_outHtml.push(''
,'        <div class="new gt-projectItem" title="Created ', createdTime ,'">'
,'            <h2><a href="', url ,'">', title ,'</a></h2> <span>', created ,'</span>'
,'        </div>'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_630cf1ac460c4b80bc6ce9b08045c3f2() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("GlittertindNewProject", DisplayTemplate_630cf1ac460c4b80bc6ce9b08045c3f2);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_NewProject.js", DisplayTemplate_630cf1ac460c4b80bc6ce9b08045c3f2);
}
////
}
RegisterTemplate_630cf1ac460c4b80bc6ce9b08045c3f2();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_NewProject.js"), RegisterTemplate_630cf1ac460c4b80bc6ce9b08045c3f2);
}