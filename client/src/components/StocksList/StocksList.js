import React from 'react'
import classes from './StocksList.css'
import {Droppable,Draggable} from "react-beautiful-dnd"


const StocksList = props => {
	return (
		<Droppable droppableId="droppAble">
		  {provided => (
		   <ul className={classes.StocksList} ref={provided.innerRef} {...provided.droppableProps}>
		    <li>
		     <div className={classes.leftSide}>
		       <div>Number</div>
		      <div>Company Name</div>
		     </div>
		     <div className={classes.rightSide}>
		       <div>Size</div>
		       <div>Price for item</div>
		     </div>
		     
		   </li>
		   {
		    props.onePageList.map((respItem, index) => {
		      return (
		        <Draggable key={index}  index={index} draggableId={index + 1}>
		        {provided => (
			       <li className={index + 1}  ref={provided.innerRef}
			          {...provided.draggableProps}
			          {...provided.dragHandleProps}>
			        <div className={classes.leftSide}>
			        <div>{props.onePageListBeginNumbr + 1 + index}</div>
			        <div>{respItem.symbol}</div>
			        </div>
			        <div className={classes.rightSide}>
			          <div>{respItem.size}</div>
			          <div>{respItem.price}</div>
			        </div>
			        
			      </li>
		      )}
		        </Draggable>
		      )
		    })
		   }
		   {provided.placeholder}
		   </ul>
		   )}
		</Droppable>
	)
}


export default StocksList