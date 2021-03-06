import {ObservableArray} from "data/observable-array";
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import observableModule = require("data/observable");
import timer = require("timer");
import frameModule = require("ui/frame");

export class ViewModel extends observableModule.Observable {
    private _items;
    private _animations;

    constructor() {
        super();
        this.initDataItems();
        this._animations = {
            options: ["Default", "Fade", "Scale", "Slide"],
            index: 0
        };
    }

    get dataItems() {
        return this._items;
    }

    public onAddItemClick(args: listViewModule.ListViewEventData) {
        var id = Math.round(Math.random() * 100);
        this._items.push(new DataItem(id, "This is a new item: " + id, "This is the new item's description."));
    }

    public onResetClick(args: listViewModule.ListViewEventData) {
        while (this._items.length) {
            this._items.pop();
        }
    }

    public onUpdateItemClick(args: listViewModule.ListViewEventData) {
        for (var index = 0; index < this._items.length; index++) {
            this._items.getItem(index).id = Math.random() * 100;
            this._items.getItem(index).itemName = "This is an updated item";
            this._items.getItem(index).itemDescription = "This is the updated item's description.";
        }
    }

    public onRemoveItemClick(args: listViewModule.ListViewEventData) {
        this._items.splice(this._items.length - 1, 1);
    }

    private initDataItems() {
        this._items = new ObservableArray<DataItem>();
    }

    public updateItemAnimation() {
        var index: number = this._animations.index;
        let b = this._animations.options[index];
        var listView = <listViewModule.RadListView>frameModule.topmost().currentPage.getViewById("ls");
        (<listViewModule.ListViewLinearLayout>listView.listViewLayout).itemInsertAnimation = this._animations.options[index];
        (<listViewModule.ListViewLinearLayout>listView.listViewLayout).itemDeleteAnimation = this._animations.options[index];
    }

    public onOptionsTapped() {
        var navigationEntry = {
            moduleName: "/navigation/options-menu/options",
            context: this._animations,
            animated: true
        };

        frameModule.topmost().navigate(navigationEntry);
    }
}

export class DataItem extends observableModule.Observable {


    constructor(id: number, name: string, description: string) {
        super();
        this.id = id;
        this.itemName = name;
        this.itemDescription = description;
    }

    get id(): number {
        return this.get("_id");
    }

    set id(value: number) {
        this.set("_id", value);
    }

    get itemName(): string {
        return this.get("_itemName");
    }

    set itemName(value: string) {
        this.set("_itemName", value);
    }

    get itemDescription(): string {
        return this.get("_itemDescription");
    }

    set itemDescription(value: string) {
        this.set("_itemDescription", value);
    }
}
