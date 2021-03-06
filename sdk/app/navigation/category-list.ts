import categoriesViewModel = require("./categories-view-model");
import frameModule = require("ui/frame");
import actionBarModule = require("ui/action-bar");
import applicationModule = require("application");

var dataModel = categoriesViewModel.navigationModel;

export function pageLoaded(args) {
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.controller.interactivePopGestureRecognizer.enabled = false;
    }
}

export function onPageNavigatingTo(args) {
    var page = args.object;
    dataModel.initModelData();

    page.bindingContext = dataModel;
}

export function onPageNavigatingFrom(args) {
    args.object.bindingContext = undefined;
    if (args.isBackNavigation && (dataModel.canMoveBack() === true)) {
        dataModel.moveBack();
    }
}

export function onBackTap(args) {
    frameModule.topmost().goBack();
}