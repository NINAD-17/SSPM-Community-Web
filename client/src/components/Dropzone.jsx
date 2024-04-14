import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({files, setFiles, custCSS=null}) => {
    const [ rejectedFiles, setRejectedFiles ] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        console.log({acceptedFiles});
        if(acceptedFiles?.length) {
            setFiles(previousFiles => [
                // ...previousFiles,
                ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file)}))
            ])
        }

        if (rejectedFiles?.length) {
            setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
          "image/*": []  
        },
        maxFiles: 1,
        onDrop
    });

    useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files?.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

    const removeFile = (name) => {
        setFiles((files) => files?.filter(file => file.name !== name));
    }

    return (
        <>
            <div {...getRootProps({
                className: `border-2 border-dotted border-blue-300 rounded-xl text-center text-gray-400 p-5 w-full ${files?.length > 0 ? "hidden" : ""}`
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop Files Here ...</p> :
                        <p>Drag and Drop image here or <span className="text-blue-600 hover:underline cursor-pointer">click</span> to select the image</p>
                }
            </div>
        
            {/** Preview */}
            <ul className="flex items-center">
            {
                files?.map(file => (
                    <li key={file.name} className={`w-1/2 relative mx-auto`}>
                        <img src={file.preview} alt={file.name} className={`object-cover border ${custCSS ? custCSS: "h-auto w-full  rounded-lg"} `} />
                        <button className="" onClick={() => removeFile(file.name)}>
                            <span className="material-symbols-outlined absolute top-0 -right-6 hover:text-red-500">delete</span>
                        </button>
                    </li>
                ))
            }
            </ul>
        </>
        
    )
}

export default Dropzone;