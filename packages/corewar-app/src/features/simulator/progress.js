import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as PubSub from 'pubsub-js'
import { getFileState } from '../files/reducer'
import { replaceItem } from '../../services/array'
import { getSimulatorState } from './reducer'

const getWidth = (tasks, maxTasks) => {
  if (!tasks) {
    return 0
  }

  return Math.floor((tasks / maxTasks) * 100)
}

const Progress = () => {
  const { files } = useSelector(getFileState)
  const { runProgress, maxTasks } = useSelector(getSimulatorState)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    PubSub.subscribe('CORE_INITIALISE', (msg, data) => {
      setTasks([])
    })
    return function cleanup() {
      PubSub.unsubscribe('CORE_INITIALISE')
    }
  })
  useEffect(() => {
    PubSub.subscribe('TASK_COUNT', (msg, data) => {
      let newTasks = tasks

      data.forEach(item => {
        newTasks = replaceItem(item.warriorId, newTasks, item.taskCount)
      })

      setTasks(newTasks)

      return function cleanup() {
        PubSub.unsubscribe('TASK_COUNT')
      }
    })
  })
  return (
    <div className="max-w-core w-full h-30 flex-initial">
      <div className="h-8 flex items-center justify-center relative">
        <span className="absolute mx-auto z-10">{`${runProgress ? runProgress : 0}%`}</span>
        <span
          className="absolute left-0 bg-gray-700 h-8 rounded"
          style={{ width: `${runProgress ? runProgress : 0}%` }}
        ></span>
      </div>
      <div className="flex flex-col h-20 flex-initial">
        {files.map((file, i) => (
          <div
            className={`mt-2 rounded h-${Math.round(16 / files.length)}`}
            style={{
              width: `${getWidth(tasks[i], maxTasks)}%`,
              backgroundColor: `${file.data.icon &&
                `rgba(${file.data.icon.foreground[0]},${file.data.icon.foreground[1]},${file.data.icon.foreground[2]},${file.data.icon.foreground[3]})`}`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

// colour={warrior.data.colour && warrior.data.colour.hex}

export default Progress
