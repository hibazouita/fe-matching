import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import close from './close.svg'
import './FileItem.css'
import pdfIcon from './pdf-img.png'
import { multiStepContext } from '../../StepContext';
const FileItem = ({ file, deleteFile }) => {
    const {userData,setUserData}=useContext(multiStepContext)
    return (
        <>
            <li
                className="file-item"
                key={file.name}
                
                >
                <FontAwesomeIcon icon={faFileAlt} />
                <span>{file.name}</span>
                <div className="actions">
                    {file &&
                        <FontAwesomeIcon icon={faTrash}
                            onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>
        </>
    )
}

export default FileItem