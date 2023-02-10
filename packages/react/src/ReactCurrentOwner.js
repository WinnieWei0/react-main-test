import { Fiber } from 'react-reconciler/src/ReactInternalTypes'

// 跟踪当前所有者，所有者是拥有当前组件的组件
const ReactCurrentOwner = {
  current: (null: null| Fiber)
}
export default ReactCurrentOwner