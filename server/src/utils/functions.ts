import fs from 'fs';
import path from 'path';

export const removeDuplicates = (data: any, key: any) => {

    return [
        ...new Map(data.map((item: any) => [key(item), item])).values()
    ]

};

export const clearImage = (filePath: string) => {
    filePath = path.join(__dirname, '../', filePath)
    console.log(filePath)
    if (filePath.includes('build')) {                             //It's will be remove
        fs.unlink(filePath, err => {                              //It's will be remove
            console.log(err)                                      //It's will be remove
        })                                                        //It's will be remove
        filePath = filePath.replace('build/', '')                 //It's will be remove
    }                                                             //It's will be remove
    fs.unlink(filePath, err => {
        console.log(err)
    })
}