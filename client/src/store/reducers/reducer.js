const initialState = {
	genList:[],
	onePageList: [],
	onePageListBeginNumbr: 0
}


export default function reducer(state = initialState, action) {

	switch (action.type) {
		case 'SUCCES_API_CON':
			return {
				...state,
				genList: action.apiResult
			}

		case 'CREATE_ONE_PAGE_LIST':
			return {
				...state,
				onePageList: action.onePageList
			}
		case 'ON_DRAG_END':
			return {
				...state,
				onePageList: action.onePageList
			}
		case 'UPDATE_BEGIN_NAME':
			return {
				...state,
				onePageListBeginNumbr: action.newBeginNum
			}
		default:
			return state
	}

}