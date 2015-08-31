/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_14afe67bf73d470b9e60bf802dbaeb23(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_14afe67bf73d470b9e60bf802dbaeb23.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project_details.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping'] = { 'Path': null, 'Title': null, 'ProjectManager': ['GtProjectManagerOWSUSER'], 'ProjectOwner': ['GtProjectOwnerOWSUSER'], 'ProjectPhase': ['owstaxIdGtProjectPhase'], 'Created': null, 'GtProjectGoalsOWSMTXT': null, 'GtStatusTimeOWSCHCS': null, 'GtStatusRiskOWSCHCS': null, 'GtStatusBudgetOWSCHCS': null, 'LastModifiedTime': null };
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
        var projectPhase = $getItemValue(ctx, "ProjectPhase").toString();
        var created = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy");
        var createdTime = new Date($getItemValue(ctx, "Created").inputValue).format("dd MMM yyyy kl HH:mm:ss");
        var projectGoals = $getItemValue(ctx, "GtProjectGoalsOWSMTXT").inputValue;
        var projectGoalsTrimmed = Srch.U.getTrimmedString( projectGoals , 20);
        var statusTime = $getItemValue(ctx, "GtStatusTimeOWSCHCS");
        var statusRisk = $getItemValue(ctx, "GtStatusRiskOWSCHCS");
        var statusBudget = $getItemValue(ctx, "GtStatusBudgetOWSCHCS");
        var lastModified = $getItemValue(ctx, "LastModifiedTime");
        var statusTimeCss = GT.Project.Model.GetStatusCssClass(statusTime.value);
        var statusRiskCss = GT.Project.Model.GetStatusCssClass(statusRisk.value);
        var statusBudgetCss = GT.Project.Model.GetStatusCssClass(statusBudget.value);
    ms_outHtml.push(''
,'        <td>'
,'            <a href="', url ,'">'
,'                ', title ,''
,'            </a>'
,'		</td>'
,'		<td title="', projectGoals ,'">'
,'			', projectGoalsTrimmed ,' '
,'		</td>'
,'		<td>'
,'			', projectOwner ,''
,'		</td>'
,'		<td>'
,'			', projectManager ,''
,'		</td>'
,'        <td class="', statusTimeCss ,'">'
,'            ', statusTime ,''
,'        </td>'
,'        <td class="', statusRiskCss ,'">'
,'            ', statusRisk ,''
,'        </td>'
,'        <td class="', statusBudgetCss ,'">'
,'            ', statusBudget ,''
,'        </td>'
,'        <td>'
,'            ', projectPhase ,''
,'        </td>'
,'		<td>'
,'			', lastModified ,''
,'		</td>		'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_14afe67bf73d470b9e60bf802dbaeb23() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("TwoLines", DisplayTemplate_14afe67bf73d470b9e60bf802dbaeb23);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project_details.js", DisplayTemplate_14afe67bf73d470b9e60bf802dbaeb23);
}
////
}
RegisterTemplate_14afe67bf73d470b9e60bf802dbaeb23();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_Project_details.js"), RegisterTemplate_14afe67bf73d470b9e60bf802dbaeb23);
}