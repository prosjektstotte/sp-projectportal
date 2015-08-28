/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_febe01d3d836477cb47a1ec19ab81c9f(ctx) {
    var ms_outHtml = [];
    var cachePreviousTemplateData = ctx['DisplayTemplateData'];
    ctx['DisplayTemplateData'] = new Object();
    DisplayTemplate_febe01d3d836477cb47a1ec19ab81c9f.DisplayTemplateData = ctx['DisplayTemplateData'];

    ctx['DisplayTemplateData']['TemplateUrl'] = '~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table.js';
    ctx['DisplayTemplateData']['TemplateType'] = 'Control';
    ctx['DisplayTemplateData']['TargetControlType'] = ['SearchResults', 'Content Web Parts'];
    this.DisplayTemplateData = ctx['DisplayTemplateData'];

    ms_outHtml.push('', ''
    , ''
    );
    if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl()) {
        return "";
    }
    ctx.ListDataJSONGroupsKey = "ResultTables";

    var noResultsClassName = "ms-srch-result-noResults";

    var ListRenderRenderWrapper = function (itemRenderResult, inCtx, tpl) {
        var iStr = [];
        if (inCtx.CurrentItemIdx % 2 === 0) {
            iStr.push('<tr class="ms-HoverBackground-bgColor">');
        } else {
            iStr.push('<tr>');
        }
        iStr.push(itemRenderResult);
        iStr.push('</tr>');
        return iStr.join('');
    }
    ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
    ms_outHtml.push(''
    , '    <table class="gt-result-table">'
    , '		<thead>'
    , '			<tr>'
    , '				<th>Title</th>'
    , '				<th>Project Goal</th>'
    , '				<th>Project Owner</th>'
    , '				<th>Project Manager</th>'
    , '				<th>Status, time</th>'
    , '				<th>Status, risk</th>'
    , '				<th>Status, budget</th>'
    , '                <th>Phase</th>'
    , '				<th>Last modified</th>'
    , '			</tr>'
    , '		</thead>'
    , '		<tbody>'
    , '           ', ctx.RenderGroups(ctx), ''
    , '		 </tbody>'
    , '	</table>'
    , '	'
    , '	'
    , '	'
    , '	'
    );
    if (ctx.ClientControl.get_shouldShowNoResultMessage()) {
        ms_outHtml.push(''
        , '        <div class="', noResultsClassName, '">No elements to show</div>'
        );
    }
    ms_outHtml.push(''
    , ''
    , '    '
    );

    ctx['DisplayTemplateData'] = cachePreviousTemplateData;
    return ms_outHtml.join('');
}
function RegisterTemplate_febe01d3d836477cb47a1ec19ab81c9f() {

    if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
        Srch.U.registerRenderTemplateByName("Control_List", DisplayTemplate_febe01d3d836477cb47a1ec19ab81c9f);
    }

    if ("undefined" != typeof (Srch) && "undefined" != typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) == "function") {
        Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table.js", DisplayTemplate_febe01d3d836477cb47a1ec19ab81c9f);
    }
    //
    //
}
RegisterTemplate_febe01d3d836477cb47a1ec19ab81c9f();
if (typeof (RegisterModuleInit) == "function" && typeof (Srch.U.replaceUrlTokens) == "function") {
    RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fGlittertind_Control_Table.js"), RegisterTemplate_febe01d3d836477cb47a1ec19ab81c9f);
}