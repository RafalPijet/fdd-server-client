export const removeDuplicates = (data: any, key: any) => {

    return [
        ...new Map(data.map((item: any) => [key(item), item])).values()
    ]

};