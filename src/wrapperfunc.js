/* 		use Wrapper Pattern to check 
*  if your component has authority or display state
*  Or do other stuff needs to be handled from outside of component  
*  	    @athuor:wsg
*/

import  React  from 'react'

export default function authorityWrapper (component){
	const checkAuthority = (props)=>{

		// authority logic
		let {auth} = props;
	      // No Auth required
	      if(auth == null) {
	        return true;
	      }
	      return windows.globals.permissions[auth];    
	}
	/*  Command Pattern
	*	select component render state 
	 */
	const renderSelect = (type)=>{


		let renderType = {
			'hidden': 		() => null,
			'disabled': 	() => React.cloneElement(super.render(),{disabled:true}),
			'isWinPopup':   () => React.cloneElement(super.render(),{isPopup:true}),
			'isFormEl': 	() => React.cloneElement(super.render(),{isPopup:true}),
			'isValidator':  () => React.cloneElement(super.render(),{isPopup:true}),
			'isLinked': 	() => React.cloneElement(super.render(),{isPopup:true})
		}

		if(typeof renderType[type] === 'function'){
			return renderType[type]()
		}else{
			return false
		}
	}

	let wrapperComponent = class extends component {

		render() {
			if(checkAuthority(this.props)) {
				return super.render()
			} else {
				const autoType = this.props.autoType || 'hidden'

				return renderSelect(autoType)

			}
		}
	}

	return wrapperComponent
}