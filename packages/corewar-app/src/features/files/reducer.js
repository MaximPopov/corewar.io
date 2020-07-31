import {
  SET_CURRENT_FILE,
  // TOGGLE_CONSOLE,
  // HIDE_CONSOLE,
  // SHOW_CONSOLE,
  // TOGGLE_FILE_MANAGER,
  TOGGLE_FILE_BROWSER,
  SET_FILES,
  LOAD_FILE,
  SET_COLOURS
} from './actions'

// state
import initialState from './state/initial-state'

// selectors
export const getFileState = state => state.file

// reducer
export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SET_CURRENT_FILE:
      return {
        ...state,
        displayFileManager: false,
        currentFile: action.currentFile
      }

    case SET_FILES:
      return {
        ...state,
        files: action.files
      }

    case SET_COLOURS:
      return {
        ...state,
        colours: action.colours
      }

    case LOAD_FILE:
      return {
        ...state,
        currentFile: action.file
      }

    // case TOGGLE_CONSOLE:
    //   return {
    //     ...state,
    //     displayConsole: !state.displayConsole
    //   }

    // case HIDE_CONSOLE:
    //   return {
    //     ...state,
    //     displayConsole: false
    //   }

    // case SHOW_CONSOLE:
    //   return {
    //     ...state,
    //     displayConsole: true
    //   }

    // case TOGGLE_FILE_MANAGER:
    //   return {
    //     ...state,
    //     displayFileManager: !state.displayFileManager
    //   }

    case TOGGLE_FILE_BROWSER:
      return {
        ...state,
        displayFileBrowser: !state.displayFileBrowser
      }

    default:
      return state
  }
}
