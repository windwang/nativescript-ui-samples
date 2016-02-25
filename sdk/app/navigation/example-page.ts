import pageModule = require("ui/page");
import actionBarModule = require("ui/action-bar");
import applicationModule = require("application");
import frameModule = require("ui/frame");
import viewModel = require("./categories-view-model");

export class ExamplePage extends pageModule.Page {

    private _associatedExampleMeta: viewModel.NavigationItem;

    public constructor() {
        super();
        var that = new WeakRef(this);
        this.on("navigatingTo", function(args) {
            that.get()._associatedExampleMeta = args.context;
        });


    }

    public onLoaded(args) {
        super.onLoaded(args);

        var actionBar = this.actionBar === undefined ? new actionBarModule.ActionBar() : this.actionBar;
        actionBar.title = this._associatedExampleMeta.title;
        if (applicationModule.android) {
            var navigationButton = new actionBarModule.NavigationButton();
            navigationButton.on("tap", args =>
            { frameModule.topmost().goBack() });
            navigationButton.icon = "res://ic_arrow_back_black_24dp";
            actionBar.navigationButton = navigationButton;

        }
        
        //   <ios>
        //     <ActionItem text="Options" ios.position="right" tap="{{onOptionsTapped}}" />
        // </ios>
        // <android>
        //     <ActionItem text="None" android.position="popup" tap="onNoneSetSelectionModeTap" />
        //     <ActionItem text="Single" android.position="popup" tap="onSingleSetSelectionModeTap" />
        //     <ActionItem text="Multiple" android.position="popup" tap="onMultipleSetSelectionModeTap" />
        //     <ActionItem text="Range" android.position="popup" tap="onRangeSetSelectionModeTap" />
        // </android>
                
                
        if (applicationModule.ios) {
            this.actionBar.actionItems.splice(0, this.actionBar.actionItems.length);
            var actionItem = new actionBarModule.ActionItem();
            actionItem.text = "Options";
            actionItem.ios.position = "right";
            this.actionBar.actionItems.push(actionItem);

        }

        if (applicationModule.android) {
            for (var i = 0; i < this._associatedExampleMeta.options.length; i++) {

            }
        }

        if (this.actionBar !== actionBar) {
            this.actionBar = actionBar;
        }
    }
}
