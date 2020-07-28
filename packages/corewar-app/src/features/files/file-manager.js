import React from 'react'
import FileButton from './file-button'
import FileSelector from './file-selector'
import CodeEditor from './code-editor'
import { useSelector, useDispatch } from 'react-redux'

const FileManager = ({ newFile, openFile, toggleFile, deleteFile }) => {
  const shiz = useSelector(state => state.file)
  console.log(shiz)
  const files = [],
    currentFile = {}
  const dispatch = useDispatch()
  return (
    <>
      <div className="w-full">
        <FileButton onClick={dispatch(newFile)}>New</FileButton>
        <FileButton onClick={dispatch(openFile)}>Open</FileButton>
      </div>
      <section className="flex flex-row flex-1 mt-4 pr-8">
        <FileSelector
          files={files}
          toggleFile={dispatch(toggleFile)}
          deleteFile={dispatch(deleteFile)}
        ></FileSelector>
        <CodeEditor currentFile={currentFile}></CodeEditor>
      </section>
    </>
  )
}

export default FileManager
