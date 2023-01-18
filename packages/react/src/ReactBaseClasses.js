import ReactNoopUpdateQueue from './ReactNoopUpdateQueue'
import assign from 'shared/assign'
 const emptyObject={}
 
 function Component(props,context,updater){
    this.props=props
    this.context=context
    this.refs=emptyObject
    this.updater=updater||ReactNoopUpdateQueue
 }
 Component.proptotype.isReactComponent={}