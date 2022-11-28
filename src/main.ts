import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // Form submit event
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const itemId: number = fullList.list.length 
    ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 
    : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)

    fullList.addItem(newItem)

    template.render(fullList)
  })

  //To clear an item
  const clearItem = document.getElementById("clearItemsButton") as HTMLButtonElement
  clearItem.addEventListener("click", (): void => {
    fullList.clearList() // data cleared
    template.clear() // displayed cleared
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)
