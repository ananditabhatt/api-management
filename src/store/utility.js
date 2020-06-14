export const updateObject=(oldObject,UpdatedObject)=>{

    return {
        ...oldObject,
        ...UpdatedObject
    }
}