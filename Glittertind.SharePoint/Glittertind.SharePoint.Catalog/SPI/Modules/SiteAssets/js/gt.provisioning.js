﻿var GT = GT || {};
GT.Provisioning = GT.Provisioning || {};
if (GT.jQuery === undefined) GT.jQuery = jQuery.noConflict(true);

GT.Resources = GT.Resources || {};
GT.jQuery.extend(GT.Resources, {
    "createform_error_mandatoryfields": "Name and Shortname is mandatory fields",
    "createform_error_webexits": "A web with the specified url already exists",
    "dialog_creatingweb": "Creating project room"
});

function waitMessage() {
    window.parent.eval("window.waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('" + GT.Resources.dialog_creatingweb + "', '', 80, 450);");
}
function closeWaitMessage() {
    if (window.parent.waitDialog != null) {
        window.parent.waitDialog.close();
    }
};

GT.Provisioning.CreateWebFromCustomForm = function () {
    document.getElementById('projectFormValidation').innerHTML = "";

    var nameField = document.getElementById('projectNameInput');
    var urlField = document.getElementById('projectUrlInput');
    var descField = document.getElementById('projectDescriptionInput');

    if (nameField.checkValidity && (!nameField.checkValidity() || !urlField.checkValidity() || !descField.checkValidity())) {
        document.getElementById('projectFormValidation').innerHTML = GT.Resources.createform_error_mandatoryfields;
        return;
    }
    var urlToNewWeb = _spPageContextInfo.webServerRelativeUrl + "/" + urlField.value;
    GT.jQuery.when(GT.Provisioning.DoesWebExist(urlToNewWeb)).then(function (doesWebExist) {
        if (doesWebExist) {
            document.getElementById('projectFormValidation').innerHTML = GT.Resources.createform_error_webexits;
        } else {
            waitMessage();
            GT.Provisioning.CreateWeb(nameField.value, urlField.value, descField.value);
        }
    });
};

GT.Provisioning.CreateWeb = function (webTitle, webUrl, webDescription) {
    var webTemplate = '{9CA326D3-723F-4E65-B8F9-DB7E18802AC4}#ProjectWebTemplate';
    var webLanguage = 1033;

    var clientContext = SP.ClientContext.get_current();
    var currentWeb = clientContext.get_web();

    var webCreateInfo = new SP.WebCreationInformation();
    webCreateInfo.set_description(webDescription);
    webCreateInfo.set_language(webLanguage);
    webCreateInfo.set_title(webTitle);
    webCreateInfo.set_url(webUrl);
    webCreateInfo.set_useSamePermissionsAsParentSite(false);
    webCreateInfo.set_webTemplate(webTemplate);

    this.newWeb = currentWeb.get_webs().add(webCreateInfo);
    clientContext.load(this.newWeb);
    clientContext.executeQueryAsync(
		Function.createDelegate(this, GT.Provisioning.OnCreateWebSuccess),
		Function.createDelegate(this, GT.Provisioning.OnCreateWebFailure)
	);
};

GT.Provisioning.OnCreateWebSuccess = function (sender, args) {
    //1. Stop long running operation
    //2. Close modal dialog (if existing)
    //3. Redirect to new site's '_layouts/15/permsetup.aspx?HideCancel=1'
    var newUrl = this.newWeb.get_url()
    closeWaitMessage();

    var setupPermissionsUrl = newUrl + '/_layouts/15/permsetup.aspx?HideCancel=1';
    window.location.replace(setupPermissionsUrl);
};

GT.Provisioning.OnCreateWebFailure = function (sender, args) {
    closeWaitMessage();
    document.getElementById('projectFormValidation').innerHTML = args.get_message();
    console.log('An error occured: ' + args.get_message());
    console.log("Raw response data: \n" + args.get_webRequestExecutor().get_responseData());
};


GT.Provisioning.DoesWebExist = function (serverRelativeUrlOrFullUrl) {
    var deferred = GT.jQuery.Deferred();
    GT.jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/webinfos?$filter=ServerRelativeUrl eq '" + serverRelativeUrlOrFullUrl + "'",
        type: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var webs = data.d.results.length;
            if (webs >= 1) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
    return deferred.promise();
};

GT.Provisioning.SetupUrlPreviewAndValidation = function () {
    GT.jQuery('#projectUrlPreview').text(_spPageContextInfo.siteAbsoluteUrl + "/");
    GT.jQuery('#projectUrlInput').on('keyup', function (event) {
        event = event || window.event; //IE8 doesn't pass an instance of the event object to the handler, you'll have to get it from the global object
        var target = event.target || event.srcElement; // It doesn't share all of the properties and methods, either, including target
        var previewUrl = _spPageContextInfo.siteAbsoluteUrl + "/" + GT.jQuery('#projectUrlInput').val();
        GT.jQuery('#projectUrlPreview').text(previewUrl);

        if (GT.jQuery('#projectUrlInput').val().length > 2 && target.validity) {
            if (target.validity.valid) {
                document.getElementById('projectUrlInputValidation').style.display = 'none';
            } else {
                document.getElementById('projectUrlInputValidation').style.display = 'block';
            }
        }
    });
    GT.jQuery('#projectUrlInput').on('change', function (event) {
        event = event || window.event; //IE8 doesn't pass an instance of the event object to the handler, you'll have to get it from the global object
        var target = event.target || event.srcElement; // It doesn't share all of the properties and methods, either, including target
        var previewUrl = _spPageContextInfo.siteAbsoluteUrl + "/" + GT.jQuery('#projectUrlInput').val();
        GT.jQuery('#projectUrlPreview').text(previewUrl);

        if (target.validity && target.validity.valid) {
            document.getElementById('projectUrlInputValidation').style.display = 'none';
        } else if (target.validity) {
            document.getElementById('projectUrlInputValidation').style.display = 'block';
        }
    });
};


GT.Provisioning = GT.Provisioning || {};

GT.Provisioning.CanManageWeb = function () {
    var self = this;
    self.defer = GT.jQuery.Deferred();
    var clientContext = new SP.ClientContext.get_current();
    self.oWeb = clientContext.get_web();
    clientContext.load(self.oWeb);
    clientContext.load(self.oWeb, 'EffectiveBasePermissions');

    var permissionMask = new SP.BasePermissions();
    permissionMask.set(SP.PermissionKind.manageWeb);
    self.shouldShowLink = self.oWeb.doesUserHavePermissions(permissionMask);

    clientContext.executeQueryAsync(Function.createDelegate(self, GT.Provisioning.onQuerySucceededUser), Function.createDelegate(self, GT.Provisioning.onQueryFailedUser));
    return self.defer.promise();
};
GT.Provisioning.onQuerySucceededUser = function () {
    var self = this;
    self.defer.resolve(self.shouldShowLink.get_value());
};

GT.Provisioning.onQueryFailedUser = function () {
    this.defer.reject();
};

GT.Provisioning.ShowLink = function () {
    GT.Provisioning.CanManageWeb().done(function (shouldShowLink) {
        if (shouldShowLink) GT.jQuery('#newProjectLink').show();
    });
};