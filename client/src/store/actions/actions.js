export function fetchList() {

	return async dispatch => {
		const response = await fetch('/server/iexCloud')
		response.json().then(apiResult => {
			dispatch(succesApiCon(apiResult));
			dispatch(createOnePageList(0, apiResult))
		}).catch(err => console.log(err));
	}
}


export function succesApiCon(apiResult) {
	return {
		type: 'SUCCES_API_CON',
		apiResult
	}
}

export function createOnePageList(beginNumber, genList) {
	let onePageList = [];
	    for(let i = beginNumber; i < beginNumber + 10; i++) {
	      onePageList.push(genList[i]);
	    }
	 return {
	 	type: 'CREATE_ONE_PAGE_LIST',
	 	onePageList
	 }
}

export function updateBeginNumber(upNumb, onePageListBeginNumbr, genList) {
	return dispatch => {
		const newBeginNum = onePageListBeginNumbr + upNumb
		if(newBeginNum < 0 || onePageListBeginNumbr > genList.length + upNumb) {  
		    } else {
		       dispatch(setBegName(newBeginNum))
		       dispatch(createOnePageList(newBeginNum, genList))
		}   
	}
}


export function setBegName(newBeginNum) {
	return {
		type: 'UPDATE_BEGIN_NAME', newBeginNum
	}
}