import "@testing-library/jest-dom"
import { TextEncoder, TextDecoder } from "util"

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }
})

window.scroll = jest.fn()
window.alert = jest.fn()

Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: TextEncoder,
})
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: TextDecoder,
})

// global.structuredClone = v => JSON.parse(JSON.stringify(v));
// Object.defineProperty(window, "structuredClone", {
//   writable: true,
//   value: global.structuredClone,
// })

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver
