import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void
}

export default class FullList implements List {
    //
    static instance: FullList = new FullList()

    // Created a singleton(only one instance of the class created) by placing private in front of the constructor
    private constructor(
        private _list: ListItem[] = [],
    ){}

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myLists")
        if(typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myLists", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()// saves after the function has been executed
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)//filter through to delete the item
        this.save()
    }


}