var GT = GT || {};
if (GT.jQuery === undefined) GT.jQuery = jQuery.noConflict(true);
GT.Project = GT.Project || {};
GT.Project.Setup = GT.Project.Setup || {};
GT.Project.Setup.Model = GT.Project.Setup.Model || {}
GT.Project.Setup.ContentTypes = GT.Project.Setup.ContentTypes || {}
GT.Project.Setup.CustomStep = GT.Project.Setup.CustomStep || {};

GT.Project.Setup.Model.step = function (name, stepNum, callback, properties) {
    var self = this;
    self.name = name;
    self.stepNumber = stepNum;
    self.properties = properties;
    self.callback = callback;
    self.execute = function () {
        return self.callback(properties);
    };
    self.execute = function (dependentPromise) {
        var deferred = GT.jQuery.Deferred();
        dependentPromise.done(function () {
            console.log('Executing step ' + self.stepNumber);
            return self.callback(properties).done(function () {
                var properties = { currentStep: { 'key': 'glittertind_currentsetupstep', 'value': self.stepNumber + 1 } };
                GT.Project.Setup.persistProperties(properties).done(function () { deferred.resolve(); });
            });
        });
        return deferred.promise();
    };
};

GT.Project.Setup.AddGroupToCurrentWeb = function (properties) {
    var deferred = GT.jQuery.Deferred();
    var ctx = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
    var web = ctx.get_web();
    var group = web.get_siteGroups().getById(properties.GroupId);

    var collRoleDefinitionBinding = SP.RoleDefinitionBindingCollection.newObject(ctx);

    var roleDefinition = web.get_roleDefinitions().getByType(SP.RoleType[properties.PermissionLevel]);
    collRoleDefinitionBinding.add(roleDefinition);

    var collRollAssignment = web.get_roleAssignments();
    collRollAssignment.add(group, collRoleDefinitionBinding);

    ctx.load(group, 'Title');
    ctx.load(roleDefinition, 'Name');

    ctx.executeQueryAsync(
        Function.createDelegate(this, function () {
            console.log("Group 'Project Portal Owners' given full control to the site.");
            deferred.resolve();
        }),
        Function.createDelegate(this, function () {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            deferred.reject();
        }));
    return deferred.promise();
};

GT.Project.Setup.InheritNavigation = function () {
    var deferred = GT.jQuery.Deferred();

    var clientContext = SP.ClientContext.get_current();
    var web = clientContext.get_web();
    var navigation = web.get_navigation();
    navigation.set_useShared(true);

    clientContext.executeQueryAsync(function () {
        deferred.resolve();
    }, function () {
        deferred.reject();
    }
    );

    return deferred.promise();
};

GT.Project.Setup.ApplyTheme = function (properties) {
    var deferred = GT.jQuery.Deferred();

    var clientContext = SP.ClientContext.get_current();
    var web = clientContext.get_web();

    var colorPaletteUrl = _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/theme/15/" + properties.colorPaletteName;
    var fontSchemeUrl = _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/theme/15/" + properties.fontSchemeName;

    web.applyTheme(colorPaletteUrl, fontSchemeUrl, properties.backgroundImageUrl, properties.shareGenerated);
    web.update();

    clientContext.executeQueryAsync(function () {
        console.log('Changed theme for web');
        deferred.resolve();
    }, function (jqXHR, textStatus, errorThrown) {
        console.log('Error ' + errorThrown);
        deferred.reject();
    });
    return deferred.promise();
};

GT.Project.Setup.ConfigureQuickLaunch = function () {
    var deferred = GT.jQuery.Deferred();

    var clientContext = SP.ClientContext.get_current();
    var web = clientContext.get_web();
    var quickLaunchNodeCollection = web.get_navigation().get_quickLaunch();

    clientContext.load(web);
    clientContext.load(quickLaunchNodeCollection);
    clientContext.executeQueryAsync(function () {
        GT.Project.Setup.getFiles(_spPageContextInfo.siteServerRelativeUrl, "SiteAssets", "gt/config/quicklaunch")
        .done(function (files) {
            for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                GT.jQuery.getJSON(files[fileIndex].ServerRelativeUrl)
                .then(function (data) {
                    var temporaryQuickLaunch = [];
                    var index = quickLaunchNodeCollection.get_count() - 1;
                    while (index >= 0) {
                        var oldNode = quickLaunchNodeCollection.itemAt(index);
                        temporaryQuickLaunch.push(oldNode);
                        oldNode.deleteObject();
                        index--;
                    }
                    clientContext.executeQueryAsync(function () {
                        for (var i = 0; i < data.length; i++) {
                            var linkNode = data[i];
                            var nodeTitle = linkNode.Title;
                            var linkUrl = GT.Project.Setup.GetUrlWithoutTokens(linkNode.Url);

                            var existingNode = null;
                            for (var k = 0; k < temporaryQuickLaunch.length; k++) {
                                if (temporaryQuickLaunch[k].get_title() === nodeTitle) {
                                    existingNode = temporaryQuickLaunch[k];
                                    break;
                                }
                            }
                            var newNode = new SP.NavigationNodeCreationInformation();
                            newNode.set_title(nodeTitle);
                            if (existingNode === null || existingNode === undefined) {
                                newNode.set_url(linkUrl);
                            } else {
                                newNode.set_url(existingNode.get_url());
                            }
                            newNode.set_asLastNode(true);
                            quickLaunchNodeCollection.add(newNode);

                            console.log('Adding the link node ' + linkNode.Title + ' to the quicklaunch');
                        };
                        clientContext.executeQueryAsync(function () { deferred.resolve(); }, function () { deferred.reject(arguments); });
                    }, function (jqXHR, textStatus, errorThrown) {
                        console.log('Error deleting objects ' + errorThrown);
                    });
                })
                .done(function () {

                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('Error ' + errorThrown);
                    deferred.reject();
                });
            }
        })
        .fail(function () {
            deferred.reject();
        });
    }, function () {
        console.log("Couldnt load quicklaunchcollection");
    });
    return deferred.promise();
};

// See tokens here: http://msdn.microsoft.com/en-us/library/office/ms431831%28v=office.15%29.aspx
GT.Project.Setup.GetUrlWithoutTokens = function (url) {
    return url.replace('{Site}', _spPageContextInfo.webAbsoluteUrl)
              .replace('{SiteUrl}', _spPageContextInfo.webAbsoluteUrl)
              .replace('{SiteUrlEncoded}', encodeURIComponent(_spPageContextInfo.webAbsoluteUrl))
              .replace('{SiteCollection}', _spPageContextInfo.siteAbsoluteUrl)
              .replace('{SiteCollectionEncoded}', encodeURIComponent(_spPageContextInfo.siteAbsoluteUrl));
};

// [start] utility methods
GT.Project.Setup.resolveProperties = function (properties) {
    var deferred = GT.jQuery.Deferred();

    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var props = web.get_allProperties();
    context.load(props);

    context.executeQueryAsync(
        function () {
            for (var property in properties) {
                var spPropertyValue = props.get_fieldValues()[properties[property].key];
                if (spPropertyValue != undefined) {
                    properties[property].value = spPropertyValue;
                }
            }
            deferred.resolve(properties);
        }, function () {
            deferred.reject();
        }
    );
    return deferred.promise();
};

GT.Project.Setup.persistProperties = function (properties) {

    var deferred = GT.jQuery.Deferred();
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var propBag = web.get_allProperties();

    for (var property in properties) {
        var key = properties[property].key;
        var value = properties[property].value;
        propBag.set_item(key, value);
    }
    context.load(web);
    web.update();
    context.executeQueryAsync(
    function (sender, args) {
        console.log("persisted properties!");
        deferred.resolve();
    },
    function (sender, args) {
        console.log('Persisting properties failed: ' + args.get_message());
        console.log(args.get_stackTrace());
        deferred.reject();
    });

    return deferred.promise();
};

GT.Project.Setup.Utility = GT.Project.Setup.Utility || {};
GT.Project.Setup.Debug = GT.Project.Setup.Debug || {};

GT.Project.Setup.Debug.listAllProperties = function () {

    var context = SP.ClientContext.get_current();
    var props = context.get_web().get_allProperties();
    context.load(props);

    context.executeQueryAsync(
        function (sender, args) {
            console.log(props.get_fieldValues());
        }, function (sender, args) {
            console.log('Request failed: ' + args.get_message());
            console.log(args.get_stackTrace());
        }
    );
};

GT.Project.Setup.Debug.setProperty = function (key, value) {

    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var propBag = web.get_allProperties();
    propBag.set_item(key, value);
    context.load(web);
    web.update();
    context.executeQueryAsync(function () { console.log("successfully set property " + key); }, function () { });
};


GT.Project.Setup.showWaitMessage = function () {
    window.parent.eval("window.waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('<div style=\"text-align: left;display: inline-table;margin-top: 13px;\">Please wait while we set up the <br />project site</div>', '', 140, 500);");
};

GT.Project.Setup.closeWaitMessage = function () {
    if (window.parent.waitDialog != null) {
        window.parent.waitDialog.close();
    }
};
// [end] utility methods

GT.Project.Setup.copyFiles = function (properties) {
    var _this = this;
    _this.deferred = GT.jQuery.Deferred();
    _this.promises = [];
    var srcWeb = properties.srcWeb;
    var srcLib = properties.srcLib;
    var dstWeb = properties.dstWeb;
    var dstLib = properties.dstLib;

    GT.jQuery.when(GT.Project.Setup.getFiles(srcWeb, srcLib))

    .then(function (files) {

        for (var i = 0; i < files.length; i++) {
            _this.promises.push(GT.Project.Setup.copyFile(files[i], srcWeb, dstWeb, dstLib));
        }
        GT.jQuery.when.apply(GT.jQuery, _this.promises)
        .always(function () {
            console.log("all done copying files");
            _this.deferred.resolve();
        });

    });
    return _this.deferred.promise();
};

GT.Project.Setup.getFiles = function (srcWeb, lib, folderPath) {
    var deferred = GT.jQuery.Deferred();

    if (GT.Common.IsNonHtml5Browser()) {
        console.log("Using IE<10, skipping getting files (non IE<10 compatible)");
        deferred.resolve();
        return deferred.promise();
    }
    if (folderPath == undefined) {
        var srcFolderQuery = "_api/web/GetFolderByServerRelativeUrl('" + srcWeb + "/" + lib + "')/Files";
    } else {
        var srcFolderQuery = "_api/web/GetFolderByServerRelativeUrl('" + srcWeb + "/" + lib + "/" + folderPath + "')/Files";
    }
    var executor = new SP.RequestExecutor(srcWeb);
    var info = {
        url: srcFolderQuery,
        method: "GET",
        contentType: "application/json;odata=verbose",
        binaryStringResponseBody: true,
        headers: {
            "Accept": "application/json; odata=verbose",
            "X-RequestDigest": GT.jQuery("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var result = JSON.parse(data.body).d.results;
            deferred.resolve(result);

        },
        error: function (err) {
            deferred.reject();
        }
    };
    executor.executeAsync(info);
    return deferred.promise();
};

GT.Project.Setup.copyFile = function (file, srcWeb, dstWeb, dstLib) {
    var deferred = GT.jQuery.Deferred();

    var executor = new SP.RequestExecutor(srcWeb);
    var info = {
        url: file.__metadata.uri + "/$value",
        method: "GET",
        binaryStringResponseBody: true,
        success: function (data) {
            var executor2 = new SP.RequestExecutor(dstWeb);
            //binary data available in data.body
            var result = data.body;
            var digest = GT.jQuery("#__REQUESTDIGEST").val();
            var info2 = {
                url: "_api/web/GetFolderByServerRelativeUrl('" + dstWeb + "/" + dstLib + "')/Files/Add(url='" + file.Name + "')",
                method: "POST",
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "X-RequestDigest": digest
                },
                contentType: "application/json;odata=verbose",
                binaryStringRequestBody: true,
                body: result,
                success: function (data2) {
                    console.log("Success! " + file.Name + " was uploaded to SharePoint.");
                    deferred.resolve();
                },
                error: function (err2) {
                    var d = JSON.parse(err2.body);
                    console.log("Did not upload file due to: " + d.error.message.value);
                    deferred.reject();
                }
            }
            executor2.executeAsync(info2)
        },
        error: function (err) {
            console.error(JSON.stringify(err));
            deferred.reject();
        }
    };
    executor.executeAsync(info);
    return deferred.promise();
};

GT.Project.Setup.createFolders = function () {
    var deferred = GT.jQuery.Deferred();
    GT.jQuery.ajax({
        url: _spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/gt/config/defaultfolders/folders.txt"
    })
	.done(function (data) {
	    var folders = data.split("\n");
	    if (folders.length === 0) {
	        deferred.resolve();
	        return;
	    }
	    var ctx = SP.ClientContext.get_current();
	    var web = ctx.get_web();
	    var list = web.get_lists().getByTitle("Documents");
	    var listUrl = _spPageContextInfo.webAbsoluteUrl + '/Documents';
	    var root = list.get_rootFolder();

	    for (var i = 0; i < folders.length ; i++) {
	        root.get_folders().add(listUrl + folders[i]);
	    }

	    list.update();

	    ctx.executeQueryAsync(function (sender, args) {
	        console.log("Created folder structure");
	        deferred.resolve();
	    }, function (sender, args) {
	        console.error('Request failed. ' + args.get_message());
	    });
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
	    console.log("not able to create folder structure, " + textStatus);
	    deferred.resolve();
	});
    return deferred.promise();
};

GT.Project.Setup.populateTaskList = function (listData) {

    var deferred = GT.jQuery.Deferred();

    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listData.Name);
    // private method
    var createListItem = function (row) {

        if (row.Fields) {
            var itemCreateInfo = new SP.ListItemCreationInformation();
            var listItem = oList.addItem(itemCreateInfo);

            for (var i = 0; i < row.Fields.length; i++) {
                var name = row.Fields[i].Name;
                var value = row.Fields[i].Value;
                if (value.length > 255) value = value.substr(0, 252) + "...";
                listItem.set_item(name, value);
            }

            row.ListItem = listItem;
            listItem.update();
            clientContext.load(listItem);
        }

        if (row.Rows) {
            for (var i = 0; i < row.Rows.length; i++) {
                createListItem(row.Rows[i]);
            }
        }
    }

    var updateParentIdReference = function (row) {
        if (row.ListItem) {
            var id = row.ListItem.get_item("ID");
        }
        for (var i = 0; i < row.Rows.length; i++) {
            if (id) {
                row.Rows[i].ListItem.set_item("ParentID", id);
                row.Rows[i].ListItem.update();
            }

            if (row.Rows[i].Rows) {
                updateParentIdReference(row.Rows[i]);
            }
        }
    }

    createListItem(listData.Data);

    clientContext.executeQueryAsync(function (sender, args) {

        console.log("Copied default items to " + listData.Name);
        updateParentIdReference(listData.Data);
        clientContext.executeQueryAsync(function (sender, args) {
            console.log("Updated parent task info " + listData.Name);
            deferred.resolve();
        }, function (sender, args) {
            console.error('Request failed. ' + args.get_message());
            deferred.reject();
        });

    }, function (sender, args) {
        console.error('Request failed. ' + args.get_message());
        deferred.reject();
    });
    return deferred.promise();
};

GT.Project.Setup.populateGenericList = function (listData) {

    var deferred = GT.jQuery.Deferred();
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listData.Name);

    var rows = listData.Data.Rows;
    for (var i = 0; i < rows.length; i++) {

        var itemCreateInfo = new SP.ListItemCreationInformation();
        var oListItem = oList.addItem(itemCreateInfo);

        for (var y = 0; y < rows[i].Fields.length; y++) {
            var name = rows[i].Fields[y].Name;
            var value = rows[i].Fields[y].Value;
            if (value.length > 255) value = value.substr(0, 252) + "...";
            oListItem.set_item(name, value);
        }
        oListItem.update();
        clientContext.load(oListItem);
    }

    clientContext.executeQueryAsync(function (sender, args) {
        console.log("Copied default items to " + listData.Name);
        deferred.resolve();
    }, function (sender, args) {
        console.error('Request failed. ' + args.get_message());
        deferred.reject();
    });

    return deferred.promise();

};

GT.Project.Setup.copyDefaultItems = function () {
    var _this = this;
    _this.promises = [];
    _this.deferred = GT.jQuery.Deferred();

    GT.Project.Setup.getFiles(_spPageContextInfo.siteServerRelativeUrl, "SiteAssets", "gt/config/data")
    .done(function (files) {
        for (var i = 0; i < files.length; i++) {
            _this.promises.push(GT.jQuery.Deferred());

            (function (index) {
                GT.jQuery.getJSON(files[i].ServerRelativeUrl).done(function (data) {

                    if (!data.Type || data.Type != "Tasklist") {
                        GT.Project.Setup.populateGenericList(data).done(function () {
                            _this.promises[index].resolve();
                        });
                    } else {
                        GT.Project.Setup.populateTaskList(data).done(function () {
                            _this.promises[index].resolve();
                        });
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("Could not get file: " + textStatus + " " + errorThrown);
                });
            })(i);

        }

        GT.jQuery.when.apply(GT.jQuery, _this.promises).done(function () {
            _this.deferred.resolve();
        });

    })
    .fail(function () {
        console.log("Could not find path {site collection root}/SiteAssets/gt/config/data");
        _this.deferred.reject();
    });

    return _this.deferred.promise();
};

GT.Project.Setup.ExecuteCustomSteps = function () {
    var deferred = GT.jQuery.Deferred();
    GT.jQuery.getScript(_spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/gt/js/customsteps.js")
	.done(function (status) {
	    if (status) console.log(status);
	    deferred.resolve();
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
	    console.log(textStatus);
	    deferred.reject();
	});
    return deferred.promise();
};

// TODO; At some point refactor this to be configured in json-files
GT.Project.Setup.CreateWebContentTypes = function () {
    var deferred = GT.jQuery.Deferred();

    GT.jQuery.when(
        GT.Project.Setup.ContentTypes.CreateContentType("Communication Element", "GtProjectCommunicationElement", "", "0x010088578e7470cc4aa68d5663464831070203"),
        GT.Project.Setup.ContentTypes.CreateContentType("Project Task", "GtProjectTask", "", "0x010800233b015f95174c9a8eb505493841de8d"),
        GT.Project.Setup.ContentTypes.CreateContentType("Project Product", "GtProjectProduct", "", "0x010088578e7470cc4aa68d5663464831070205"),
        GT.Project.Setup.ContentTypes.CreateContentType("Project Log Element", "GtProjectLog", "", "0x010088578e7470cc4aa68d5663464831070206")
    ).then(function () {
        GT.jQuery.when(
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Communication Plan", ["Communication Element"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Project Products", ["Project Product"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Project Log", ["Project Log Element"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Stakeholder Registry", ["Stakeholder"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Information", ["Information Element"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Uncertainties", ["Risk", "Possibility"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Tasks", ["Project Task"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Meeting Calendar", ["Project Event"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Phase Checklist", ["Checkpoint"]),
            GT.Project.Setup.ContentTypes.UpdateListContentTypes("Documents", ["Project Document"])
        ).then(function () {
            GT.jQuery.when(
                GT.Project.Setup.ContentTypes.AddFieldToListFromXml('Meeting Calendar', 'GtProjectEventDateAndTitle', '<Field ID="{7604dadc-d8e3-4f35-bc58-890d33d908b9}" Name="GtProjectEventDateAndTitle" DisplayName="Date and time" Type="Calculated" Hidden="False" Group="Glittertind Columns" Description="" Required="FALSE" ResultType="Text" ReadOnly="TRUE" EnforceUniqueValues="FALSE" Indexed="FALSE" Percentage="FALSE"><Formula>=TEXT([Start Time],"yyyy-mm-dd")&amp;" "&amp;[Title]</Formula><FieldRefs><FieldRef Name="Title" /><FieldRef Name="Start Time" /></FieldRefs></Field>')
            ).then(function () {
                GT.jQuery.when(
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("Target", "GtCommunicationTarget", "Stakeholder Registry", "Title", "{d685f33f-51b5-4e9f-a314-4b3d9467a7e4}", false, true, ""),
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("Stakeholder(s)", "GtProductInteressent", "Stakeholder Registry", "Title", "{6d90e0b6-73e6-48fb-aa1e-b897b214f934}", false, true, ""),
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("Affects product", "GtProjectLogProductLookup", "Project Products", "Title", "{022cc93f-13df-4420-bd47-55e4fdae5d18}", false, true, "Choose which products are affected by this."),
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("To Project Management", "GtProjectLogEventLookup", "Meeting Calendar", "GtProjectEventDateAndTitle", "{20731fb1-e98e-4fdc-b3d6-941b41b8fd6e}", false, false, "If this is going to the project board select the date for the meeting here."),
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("Relevant Uncertainty", "GtProjectTaskRisk", "Uncertainties", "Title", "{920b385c-756f-49eb-98e7-4c3ebf15b7f4}", false, false, ""),
                    GT.Project.Setup.ContentTypes.CreateLookupSiteColumn("Relevant Commmunication Element", "GtProjectTaskComElement", "Communication Plan", "Title", "{087dae25-b007-4e58-91b4-347dde464840}", false, false, "")
                ).then(function () {
                    GT.jQuery.when(
                        GT.Project.Setup.ContentTypes.LinkFieldsToContentType("Project Log Element", ["GtProjectLogEventLookup", "GtProjectLogProductLookup"]),
                        GT.Project.Setup.ContentTypes.LinkFieldsToContentType("Project Task", ["GtProjectTaskRisk", "GtProjectTaskComElement"]),
                        GT.Project.Setup.ContentTypes.LinkFieldsToContentType("Communication Element", ["GtCommunicationTarget"]),
                        GT.Project.Setup.ContentTypes.LinkFieldsToContentType("Project Product", ["GtProductInteressent"])
                    ).then(function () {
                        GT.jQuery.when(
                            GT.Project.Setup.ContentTypes.SetFieldDescriptionsOfList("Stakeholder Registry", [{ "key": "Title", "value": "The Stakeholder's name" }])
                        ).done(function () {
                            deferred.resolve();
                        }).fail(function () {
                            deferred.reject();
                        });
                    });
                });
            });
        });
    });

    return deferred.promise();
};

GT.Project.Setup.UpdateListsFromConfig = function () {
    var deferred = GT.jQuery.Deferred();

    GT.jQuery.when(GT.Project.Setup.getFiles(_spPageContextInfo.siteServerRelativeUrl, "SiteAssets", "gt/config/lists"))
    .then(function (files) {
        for (var i = 0; i < files.length; i++) {
            GT.jQuery.getJSON(files[i].ServerRelativeUrl).then(function (data) {
                GT.Project.Setup.UpdateListProperties(data);
                GT.Project.Setup.UpdateListViews(data);
            });
        }
    })
    .done(function () {
        deferred.resolve();
    })
    .fail(function () {
        deferred.reject();
    });

    return deferred.promise();
};
GT.Project.Setup.UpdateListProperties = function (configData) {
    var deferred = GT.jQuery.Deferred();

    var clientContext = SP.ClientContext.get_current();
    var list = clientContext.get_web().get_lists().getByTitle(configData.Name);
    list.set_onQuickLaunch(configData.OnQuickLaunch);
    list.set_enableVersioning(configData.VersioningEnabled);
    list.set_description(configData.Description);
    list.update();

    clientContext.executeQueryAsync(function () {
        deferred.resolve();
        console.log("Modified list properties of " + configData.Name);
    }, function (sender, args) {
        deferred.reject();
        console.error('Request failed. ' + args.get_message());
    });
    return deferred.promise();
};
GT.Project.Setup.UpdateListViews = function (data) {
    var deferred = GT.jQuery.Deferred();

    var listName = data.Name;
    var listViewsToConfigure = data.Views;

    var clientContext = SP.ClientContext.get_current();
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    var viewCollection = list.get_views();

    clientContext.load(viewCollection);
    clientContext.executeQueryAsync(function () {
        for (var i = 0; i < listViewsToConfigure.length; i++) {
            var viewName = listViewsToConfigure[i].Name;
            var rowLimit = listViewsToConfigure[i].RowLimit;
            var query = listViewsToConfigure[i].Query;
            var viewFieldsData = listViewsToConfigure[i].ViewFields;
            var viewUrl = listViewsToConfigure[i].Url;

            var view = null;
            if (viewName != "") {
                view = GT.Project.Setup.GetViewFromCollectionByName(viewCollection, viewName);
            } else if (viewUrl != undefined && viewUrl != "") {
                view = GT.Project.Setup.GetViewFromCollectionByUrl(viewCollection, viewUrl);
            }
            if (view != null) {
                if (viewFieldsData != undefined && viewFieldsData.length > 0) {
                    var columns = view.get_viewFields();
                    columns.removeAll();
                    for (var index = 0; index < viewFieldsData.length; index++) {
                        columns.add(viewFieldsData[index]);
                    };
                }
                if (rowLimit != undefined && rowLimit != "" && rowLimit > 0) {
                    view.set_rowLimit(rowLimit);
                }
                if (query != undefined && query != "") {
                    view.set_viewQuery(query);
                }
                view.update();
            } else {
                var viewInfo = new SP.ViewCreationInformation();
                viewInfo.set_title(viewName);
                viewInfo.set_rowLimit(rowLimit);
                viewInfo.set_query(query);
                viewInfo.set_viewFields(viewFieldsData);
                viewCollection.add(viewInfo);
            }
        };

        clientContext.load(viewCollection);
        clientContext.executeQueryAsync(function () {
            deferred.resolve();
            console.log("Modified list view(s) of " + listName);
        }, function (sender, args) {
            deferred.reject();
            console.error('Request failed. ' + args.get_message());
        });
    }, function (sender, args) {
        deferred.reject();
        console.error('Request failed. ' + args.get_message());
    });
    return deferred.promise();
};

GT.Project.Setup.GetViewFromCollectionByUrl = function (viewCollection, url) {
    var serverRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + url;
    var viewCollectionEnumerator = viewCollection.getEnumerator();
    while (viewCollectionEnumerator.moveNext()) {
        var view = viewCollectionEnumerator.get_current();
        if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
            return view;
        }
    }
    return null;
};
GT.Project.Setup.GetViewFromCollectionByName = function (viewCollection, name) {
    var viewCollectionEnumerator = viewCollection.getEnumerator();
    while (viewCollectionEnumerator.moveNext()) {
        var view = viewCollectionEnumerator.get_current();
        if (view.get_title().toString().toLowerCase() === name.toLowerCase()) {
            return view;
        }
    }
    return null;
};

GT.Project.Setup.HandleOnTheFlyConfiguration = function (defaultProperties) {
    var deferred = GT.jQuery.Deferred();
    GT.Project.Setup.resolveProperties(defaultProperties).done(function (properties) {
        GT.Project.GetPhaseNameFromCurrentItem().done(function (currentPhase) {
            // Persist change of phase
            if (currentPhase != undefined && currentPhase != "" && properties.persistedPhase.value != currentPhase) {
                GT.Project.Setup.showWaitMessage();
                GT.Project.ChangeProjectPhase().done(function () {
                    properties.persistedPhase.value = currentPhase;
                    GT.Project.Setup.persistProperties(properties).done(function () {
                        GT.Project.Setup.closeWaitMessage();
                        deferred.resolve(true);
                    });
                });
            } else {
                deferred.resolve(false);
            }
        });
    });
    return deferred.promise();
};

GT.Project.Setup.execute = function (defaultProperties, steps) {
    // 1. should i run configure? No - > stop
    // 2. All right i will run configure!
    // 3. spin over all the steps configured 
    // 4. set configured
    var _this = this;
    _this.steps = steps;
    _this.dependentPromises = [];
    var deferred = GT.jQuery.Deferred();

    GT.Project.Setup.resolveProperties(defaultProperties)
    .done(function (properties) {
        console.log("execute: using these settings :" + JSON.stringify(properties));
        if (properties.configured.value === "0") {
            console.log("execute: not configured, showing long running ops message");
            GT.Project.Setup.showWaitMessage();
            var version = properties.version.value;
            var steps = _this.steps[version];
            if (!steps) return;
            var currentStep = parseInt(properties.currentStep.value);
            console.log("execute: current step is " + currentStep);

            _this.dependentPromises.push(GT.jQuery.Deferred());
            _this.dependentPromises[0].resolve();
            _this.dependentPromises[0] = _this.dependentPromises[0].promise();

            while (steps[currentStep] != undefined) {
                var i = _this.dependentPromises.length - 1;
                console.log("execute: queuing step '" + steps[currentStep].name + "'");
                _this.dependentPromises.push(steps[currentStep].execute(_this.dependentPromises[i]));
                currentStep++;
            }
            GT.jQuery.when.apply(GT.jQuery, _this.dependentPromises).done(function () {
                properties.currentStep.value = currentStep;
                properties.configured.value = "1";
                GT.Project.Setup.persistProperties(properties);
                GT.Project.Setup.closeWaitMessage();
                console.log("execute: persisted properties and wrapping up");
                deferred.resolve(true);
            });
        } else {
            deferred.resolve(false);
        }
    });
    return deferred.promise();
};

GT.jQuery(document).ready(function () {
    var properties = {
        currentStep: {
            'key': 'glittertind_currentsetupstep',
            'value': '0'
        },
        configured: {
            'key': 'glittertind_configured',
            'value': '0'
        },
        version: {
            'key': 'glittertind_version',
            'value': '1.0.0.0'
        },
        webTemplate: {
            'key': 'glittertind_webtemplateid',
            'value': 'ProjectWebTemplate'
        },
        persistedPhase: {
            'key': 'glittertind_persistedPhase',
            'value': 'NA'
        }
    };
    GT.jQuery.when(GT.Project.Setup.PatchRequestExecutor())
        .done(function () {
            var steps = {
                '1.0.0.0': [
                    new GT.Project.Setup.Model.step("Setting project room color theme", 0, GT.Project.Setup.ApplyTheme,
                        { colorPaletteName: "palette013.spcolor", fontSchemeName: "SharePointPersonality.spfont", backgroundImageUrl: "", shareGenerated: true }),
                    new GT.Project.Setup.Model.step("Creating web content types", 1, GT.Project.Setup.CreateWebContentTypes, {}),
                    new GT.Project.Setup.Model.step("Setting navigation inheritance", 2, GT.Project.Setup.InheritNavigation, {}),
                    new GT.Project.Setup.Model.step("Configuring quicklaunch", 3, GT.Project.Setup.ConfigureQuickLaunch, {}),
                    new GT.Project.Setup.Model.step("Updating list settings and views", 4, GT.Project.Setup.UpdateListsFromConfig, {}),
                    new GT.Project.Setup.Model.step("Creating standard values in checklist", 5, GT.Project.Setup.copyDefaultItems, {}),
					new GT.Project.Setup.Model.step("Creating folder structure", 6, GT.Project.Setup.createFolders, {}),
                    new GT.Project.Setup.Model.step("Copying default documents", 7, GT.Project.Setup.copyFiles, { srcWeb: _spPageContextInfo.webServerRelativeUrl + "/..", srcLib: "StandardDocuments", dstWeb: _spPageContextInfo.webServerRelativeUrl, dstLib: "Documents" }),
                    new GT.Project.Setup.Model.step("Custom step", 9, GT.Project.Setup.ExecuteCustomSteps, {})
                ]
            };
            var scriptbase = _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/";
            GT.jQuery.getScript(scriptbase + "SP.js", function () {
                GT.jQuery.getScript(scriptbase + "SP.Taxonomy.js", function () {

                    GT.Project.Setup.execute(properties, steps)
                    .done(function (shouldReload) {
                        if (shouldReload) {
                            location.reload();
                        }
                        GT.Project.Setup.HandleOnTheFlyConfiguration(properties)
                        .done(function (shouldReload) {
                            if (shouldReload) {
                                location.reload();
                            }
                        });
                    });

                });
            });
        });
});


GT.Project.Setup.PatchRequestExecutor = function () {
    return GT.jQuery.getScript(_spPageContextInfo.webAbsoluteUrl + "/_layouts/15/SP.RequestExecutor.js", function () {
        SP.RequestExecutorInternalSharedUtility.BinaryDecode = function SP_RequestExecutorInternalSharedUtility$BinaryDecode(data) {
            var ret = '';

            if (data) {
                var byteArray = new Uint8Array(data);

                for (var i = 0; i < data.byteLength; i++) {
                    ret = ret + String.fromCharCode(byteArray[i]);
                }
            }
            ;
            return ret;
        };

        SP.RequestExecutorUtility.IsDefined = function SP_RequestExecutorUtility$$1(data) {
            var nullValue = null;

            return data === nullValue || typeof data === 'undefined' || !data.length;
        };

        SP.RequestExecutor.ParseHeaders = function SP_RequestExecutor$ParseHeaders(headers) {
            if (SP.RequestExecutorUtility.IsDefined(headers)) {
                return null;
            }
            var result = {};
            var reSplit = new RegExp('\r?\n');
            var headerArray = headers.split(reSplit);

            for (var i = 0; i < headerArray.length; i++) {
                var currentHeader = headerArray[i];

                if (!SP.RequestExecutorUtility.IsDefined(currentHeader)) {
                    var splitPos = currentHeader.indexOf(':');

                    if (splitPos > 0) {
                        var key = currentHeader.substr(0, splitPos);
                        var value = currentHeader.substr(splitPos + 1);

                        key = SP.RequestExecutorNative.trim(key);
                        value = SP.RequestExecutorNative.trim(value);
                        result[key.toUpperCase()] = value;
                    }
                }
            }
            return result;
        };

        SP.RequestExecutor.internalProcessXMLHttpRequestOnreadystatechange = function SP_RequestExecutor$internalProcessXMLHttpRequestOnreadystatechange(xhr, requestInfo, timeoutId) {
            if (xhr.readyState === 4) {
                if (timeoutId) {
                    window.clearTimeout(timeoutId);
                }
                xhr.onreadystatechange = SP.RequestExecutorNative.emptyCallback;
                var responseInfo = new SP.ResponseInfo();

                responseInfo.state = requestInfo.state;
                responseInfo.responseAvailable = true;
                if (requestInfo.binaryStringResponseBody) {
                    responseInfo.body = SP.RequestExecutorInternalSharedUtility.BinaryDecode(xhr.response);
                }
                else {
                    responseInfo.body = xhr.responseText;
                }
                responseInfo.statusCode = xhr.status;
                responseInfo.statusText = xhr.statusText;
                responseInfo.contentType = xhr.getResponseHeader('content-type');
                responseInfo.allResponseHeaders = xhr.getAllResponseHeaders();
                responseInfo.headers = SP.RequestExecutor.ParseHeaders(responseInfo.allResponseHeaders);
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 1223) {
                    if (requestInfo.success) {
                        requestInfo.success(responseInfo);
                    }
                }
                else {
                    var error = SP.RequestExecutorErrors.httpError;
                    var statusText = xhr.statusText;

                    if (requestInfo.error) {
                        requestInfo.error(responseInfo, error, statusText);
                    }
                }
            }
        };
    });
};