<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    New project workspace
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
	New project workspace
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageImage" runat="server">
	<img src="/_layouts/15/images/blank.gif?rev=23" width='1' height='1' alt="" /></asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderTitleAreaClass" runat="server">
	<SharePoint:FieldValue ID="FieldValue1" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/gt/js/jquery-1.11.1.min.js" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/gt/js/gt.common.js?rev=20140825" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:ScriptLink Name="~sitecollection/SiteAssets/gt/js/gt.provisioning.js?rev=20140825" runat="server" Language="javascript" ></SharePoint:ScriptLink>
    <SharePoint:CssRegistration Name="&lt;% $SPUrl:~sitecollection/SiteAssets/gt/css/gt.style.css?rev=20140911 %&gt;" runat="server" ></SharePoint:CssRegistration>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox"/>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderLeftActions" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderPageDescription" runat="server" >
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="PlaceHolderBodyAreaClass" runat="server">
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
	<div class="newProjectPage">
	    <div id="gtprojectinputform" class="projectInputForm">
	        <label for="projectNameInput">Name <span>*</span></label>
            <input id="projectNameInput" type="text" placeholder="Project Name" autofocus required />
	        <label for="projectUrlInput">Shortname <span>*</span></label>
            <input id="projectUrlInput" type="text" placeholder="Shortname for use in URL" required pattern="[a-zA-Z-\d]{3,20}" />
            <label id="projectUrlPreview"></label>
			<div id="projectUrlInputValidation" class="validationMessage" style="display:none">URL short name can only contain letters (except Nordic characters), numbers, and hyphens, and must be between 3 and 20 characters long.</div>
	        <label for="projectDescriptionInput">Description</label>
            <textarea id="projectDescriptionInput" type="text" placeholder="A description of the project"></textarea>
	        <div id="projectFormValidation" class="validationMessage"></div>
	        <button id="createProjectBtn" onclick="GT.Provisioning.CreateWebFromCustomForm(); return false;">Create</button>
	    </div>
		<div id="gtoldbrowser" style="display:none;">
	        Creation of projects requires that you upgrade your browser to IE10 or later.
	    </div>
    </div>
	<script type="text/javascript">
	    GT.jQuery(document).ready(function () {
	        if (!GT.Common.IsNonHtml5Browser()) {
	            GT.Provisioning.SetupUrlPreviewAndValidation();
	        }
	        else {
	            GT.jQuery("#gtprojectinputform").hide();
	            GT.jQuery("#gtoldbrowser").show();
	        }
	    });
	</script>
</asp:Content>
