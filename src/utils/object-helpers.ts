



export const updateObjectInArray = (items: any, itemID: any, objPropName: any, newObjProps: any) => {
    return items.map((u: { [x: string]: any }) => {
        if (u[objPropName] === itemID) {
            return {...u, ...newObjProps}
        }
        return u
    })
}
