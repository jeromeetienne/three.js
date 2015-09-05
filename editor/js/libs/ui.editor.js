UI.TabsHelper = {
	// http://www.my-html-codes.com/javascript-tabs-html-5-css3
	// http://www.my-html-codes.com/HTML5_tutorials/pure-javascript-html-tabs/index.php
	createTabContainer	: function(storageKey, activeTabIndex){
		console.assert( arguments.length === 2 )

		// honor .storageKey
		storageKey		= storageKey+'TabActive'
		var storedTabIndex	= localStorage.getItem(storageKey)	|| activeTabIndex

		var container	= new UI.Panel()
		var tabContainer= container
		container.dom.classList.add('tabContainer')

		var headers	= document.createElement('ul')
		headers.classList.add('headers')
		container.dom.appendChild(headers)

		var tabs	= document.createElement('div')
		tabs.classList.add('tabs')
		tabs.classList.add('Panel')
		container.dom.appendChild(tabs)

		container.addTab	= function(titleValue, tab){
			// put the title
			var title		= document.createElement('li')
			title.textContent	= titleValue

			var childIndex	= headers.children.length
			title.addEventListener('click', function(event){
				if( tabContainer.isEnabled(childIndex) === false )	return;
				// if( tabContainer.isActive(childIndex) === true )	return;
				tabContainer.setActive(childIndex)
			})

			headers.appendChild(title)
			tabs.appendChild(tab.dom)

			// honor .storageKey
			if( storedTabIndex !== null && storedTabIndex < headers.children.length ){
				container.setActive(storedTabIndex)
			}
		}

		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////
		tabContainer.setEnabled	= function(childIndex, enabled){
			var childElement= headers.children[childIndex]
			if( enabled ){
				childElement.classList.remove('disabled')
			}else{
				childElement.classList.add('disabled')
				this.setInactive(childIndex)
			}
		}

		tabContainer.isEnabled	= function(childIndex){
			console.assert(childIndex < headers.children.length)

			var isEnabled	= headers.children[childIndex].classList.contains('disabled') ? false : true
			return isEnabled
		}
		//////////////////////////////////////////////////////////////////////////////////
		//		Comment								//
		//////////////////////////////////////////////////////////////////////////////////

		tabContainer.setActive	= function(childIndex){
			if( this.isActive(childIndex) === true )	return
			this.toggleActive(childIndex)
		}

		tabContainer.setInactive	= function(childIndex){
			if( this.isActive(childIndex) === false )	return
			this.toggleActive(childIndex)
		}

		tabContainer.isActive	= function(childIndex){
			console.assert(childIndex < headers.children.length)
			console.assert(tabs.children.length === headers.children.length)

			var isActive	= headers.children[childIndex].classList.contains('active') ? true : false
			return isActive
		}

		tabContainer.toggleActive	= function(childIndex){
			console.assert(childIndex < headers.children.length)
			console.assert(tabs.children.length === headers.children.length)

			var wasActive	= this.isActive(childIndex);

			// remove all other active
			for(var i = 0; i < headers.children.length; i++){
				var child	= headers.children[i]
				headers.children[i].classList.remove('active')
				tabs.children[i].classList.remove('active')
			}
			// set active class in proper ones
			if( wasActive === true ){
				headers.children[childIndex].classList.remove('active')
				tabs.children[childIndex].classList.remove('active')
				// honor .storageKey
				storedTabIndex	= null
				localStorage.setItem(storageKey, storedTabIndex)
			}else{
				headers.children[childIndex].classList.add('active')
				tabs.children[childIndex].classList.add('active')
				// honor .storageKey
				storedTabIndex	= childIndex
				localStorage.setItem(storageKey, storedTabIndex)
			}
		}

		return container
	},

	createTab: function(){
		var container = new UI.Panel();
		container.setClass( 'tab' );
		return container
	}
};
