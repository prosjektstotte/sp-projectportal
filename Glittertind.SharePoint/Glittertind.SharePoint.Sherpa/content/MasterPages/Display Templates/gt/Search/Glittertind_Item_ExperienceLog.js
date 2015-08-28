/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_c7364b49f37346efa7bd94adefeb75fb(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_c7364b49f37346efa7bd94adefeb75fb.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_ExperienceLog.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts', 'SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':null, 'LastModifiedTime':null, 'LoggElement':['GtProjectLogTypeOWSCHCS'], 'MeldtAv':['GtProjectLogReporterOWSUSER'], 'Loggbeskrivelse':['GtProjectLogDescriptionOWSMTXT'], 'Ansvarlig':['GtProjectLogResponsibleOWSCHCS'], 'Konsekvens':['GtProjectLogConsequenceOWSMTXT'], 'Anbefaling':['GtProjectLogRecommendationOWSMTXT'], 'TilErfaringslogg':['GtProjectLogExperienceOWSBOOL'], 'Aktorer':['GtProjectLogActorsOWSCHCM'], 'PavirkerProdukt':['GtProjectLogProductLookup'], 'TilProsjektStyre':['GtProjectLogEventLookup'], 'crawltime':null, 'SPWebUrl':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
,''
);
            var myItem = {};
            myItem.id = ctx.ClientControl.get_nextUniqueId();
            myItem.url = $getItemValue(ctx, "Path");
            myItem.title = $getItemValue(ctx, "Title");
            myItem.crawltime = $getItemValue(ctx, "crawltime");
            myItem.meldtAv = $getItemValue(ctx, "MeldtAv");
            myItem.loggBeskrivelse = $getItemValue(ctx, "Loggbeskrivelse");
            myItem.ansvarlig = $getItemValue(ctx, "Ansvarlig");
            myItem.konsekvens = $getItemValue(ctx, "Konsekvens");
            myItem.anbefaling = $getItemValue(ctx, "Anbefaling");
            myItem.tilErfaringslogg = $getItemValue(ctx, "TilErfaringslogg");
            myItem.aktorer = $getItemValue(ctx, "Aktorer");
            if(myItem.aktorer !== undefined) {
            myItem.aktorer = myItem.aktorer.toString();
            myItem.aktorer = myItem.aktorer.substr(0,myItem.aktorer.length-2).split(";#").join(", ");
            }

            myItem.pavirkerProdukt = $getItemValue(ctx, "PavirkerProdukt");
            myItem.tilProsjektStyre = $getItemValue(ctx, "TilProsjektStyre");
            myItem.lastModified = $getItemValue(ctx, "LastModifiedTime");
            myItem.parentWebUrl = $getItemValue(ctx, "SPWebUrl");

            var trClass = 'erfaring';
            if (ctx.CurrentItemIdx % 2 === 0) {
                trClass = trClass + ' ms-HoverBackground-bgColor';
            }
            AddPostRenderCallback(ctx, function()
            {
                    var rootElement = document.getElementById(myItem.id);
                    var parentProjectHyperLink = rootElement.getElementsByClassName("csom-projectname")[0];

                    var loadSiteName = function(item){
                    var clientContext = new SP.ClientContext(item.href);
                    var web = clientContext.get_web();
                    clientContext.load(web, 'Title');
                    clientContext.executeQueryAsync(
                        function(){ item.text = web.get_title();},
                        function(){ item.text = "foo";}
                    );
                }
                SP.SOD.executeOrDelayUntilScriptLoaded(function(){loadSiteName(parentProjectHyperLink);},"sp.js");
            });

        ms_outHtml.push(''
,''
,'        <tr id="', myItem.id ,'" class="', trClass ,'">'
,'            <td>'
,'                <a href="', myItem.url ,'">', myItem.title ,'</a>'
,'            </td>'
,'            <td>'
,'                <a class="csom-projectname" href="', myItem.parentWebUrl ,'"></a>'
,'            </td>'
,'            <td>'
,'                ', myItem.loggBeskrivelse ,''
,'            </td>'
,'            <td>'
,'                ', myItem.ansvarlig ,''
,'            </td>'
,'            <td>'
,'                ', myItem.konsekvens ,''
,'            </td>'
,'            <td>'
,'                ', myItem.anbefaling ,''
,'            </td>'
,'            <td>'
,'                ', myItem.aktorer ,''
,'            </td>'
,'        </tr>'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_c7364b49f37346efa7bd94adefeb75fb() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("GlittertindExperienceLog", DisplayTemplate_c7364b49f37346efa7bd94adefeb75fb);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_ExperienceLog.js", DisplayTemplate_c7364b49f37346efa7bd94adefeb75fb);
}
////
}
RegisterTemplate_c7364b49f37346efa7bd94adefeb75fb();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fgt\u002fSearch\u002fGlittertind_Item_ExperienceLog.js"), RegisterTemplate_c7364b49f37346efa7bd94adefeb75fb);
}