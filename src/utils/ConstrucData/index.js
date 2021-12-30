// Construct todo list data from fake api & filtering by category
const createTodoListData = (data) => {
    const newData = data.map((item, index) => {
        return {
            ...item,
            note: 'Laboris enim cillum velit est Lorem est',
            category: index < 5 ? 'Study' : 'Work'
        }
    })
    const studyData = newData.filter(item => item.category == 'Study').reverse()
    const workData = newData.filter(item => item.category == 'Work').reverse()
    const lastId = newData[newData.length - 1].id

    return {
        studyData,
        workData,
        lastId
    }
}

// Change completed property from todo list item
const handleCheckTodoData = (data, id) => {
    let newData = [...data]
    const findIndex = newData.findIndex(item => item.id == id)
    let todoItem = newData[findIndex]
    todoItem = {
        ...todoItem,
        completed: !todoItem.completed
    }
    newData[findIndex] = todoItem

    return newData
}

// Filtering todo list data by completed status
const handleFilterTodoByCompleted = (data) => {
    const uncompleted = data.filter(item => item.completed == false)
    const completed = data.filter(item => item.completed == true)

    return {
        uncompleted,
        completed
    }
}

// Handle create todo
const handleCreateData = (data, item, lastId) => {
    let newData = [...data.reverse()]
    const newId = lastId + 1
    newData.push({
        ...item,
        id: newId,
        completed: false,
    })

    return newData.reverse()
}

// Handle delete todo
const handleDeleteData = (data, id) => {
    let newData = [...data]
    newData = newData.filter(item => item.id !== id)

    return newData
}

// Handle update todo
const handleUpdateData = (data, isCategoryChanged, item, previousData, lastId) => {
    let newData = [...data]
    let newPreData = [...previousData.data]
    if (isCategoryChanged) {
        newData = handleCreateData(newData, item, lastId)
        newPreData = handleDeleteData(newPreData, previousData.id)
    } else {
        const findIndex = newData.findIndex(x => x.id == item.id)
        newData[findIndex] = item
    }

    return {
        newData,
        newPreData
    }
}



export {
    createTodoListData,
    handleCheckTodoData,
    handleFilterTodoByCompleted,
    handleCreateData,
    handleDeleteData,
    handleUpdateData
};