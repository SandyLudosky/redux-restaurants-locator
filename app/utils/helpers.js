
export  const filterResults = (text, dataSource) => {
    return dataSource.filter((item) => {
        const itemData = item.name.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
    })  
}
