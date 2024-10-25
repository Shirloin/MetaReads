import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { InputFileProps } from '../../../Props/inputFieldProps';

function ImageInput({  
    onChange,
    name
    }:
    InputFileProps
) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current != null) {
            fileInputRef.current.click();
        }
    };

    const handleChange = (e: any) => {
        onChange(e);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className='flex items-center'>
            <div>
                <input name={name} type='file' ref={fileInputRef} accept="image/*" onChange={(e) => handleChange(e)}  className='hidden'></input>
                <div onClick={handleButtonClick} className='hover:cursor-pointer'>
                    {
                        previewUrl ?
                            <img src={previewUrl} className='w-[100px] h-[140px] border-[1px] rounded-md border-[gray] flex object-cover object-center'/>
                        :
                        <div className='border-2 flex items-center justify-center rounded-md border-[gray] text-[gray] text-[36px] w-[100px] h-[140px]'>
                            <div>+</div>
                        </div>
                    }
                </div>

            </div>
            <div>
                <div onClick={handleButtonClick} className='text-[gray] ml-2 hover:cursor-pointer'>Insert Cover Image</div>
                <div className='text-[gray] ml-2'>For the perfect display, choose 5 : 7 resolution</div>
            </div>
        </div>
    )
}

export default ImageInput