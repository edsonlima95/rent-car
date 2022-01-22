import fs from 'fs'

export const deleteFile = async (file_name: string)=>{
    try {
        await fs.promises.stat(file_name);
    } catch (error) {
        return;
    }

    await fs.promises.unlink(file_name)
}