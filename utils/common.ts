import fs from 'node:fs';

/*------- ----------*/
// Get file details such as filename and extension
/*------- ----------*/
export const getFileDetails = (slug: string, file: any) => {
    const extension = file.name.split('.').pop();
    const filename = `${slug}.${extension}`;
    return { filename, extension };

}

/*------- ----------*/
// Save a file to the specified location
/*------- ----------*/
export const saveFile = async (file: any, filename: string): Promise<void> => {
    const stream = fs.createWriteStream(`public/meals/${filename}`);
    const bufferedImage = await file.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error: Error | null | undefined) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
        stream.end();
    })
}