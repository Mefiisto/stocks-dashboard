import React, { Component } from 'react';
import classes from './App.css';
import Button from './components/Button/Button'
import StocksList from './components/StocksList/StocksList'
import { DragDropContext} from "react-beautiful-dnd"
import {connect} from 'react-redux'
import {fetchList, createOnePageList, updateBeginNumber} from './store/actions/actions'


class App extends Component {

  componentDidMount() {
    this.props.fetchList()
  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result;
     if(!destination) {
       return;
     }
     if (destination.droppableId === source.droppableId && destination.index === source.index ) {
       return;
     }
    let newPageList =  [...this.props.onePageList]
    newPageList.splice(source.index, 1)
    newPageList.splice(destination.index, 0, this.props.onePageList[draggableId - 1])
    this.props.onDragEnd(newPageList)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} >
      <div className={classes.App}>
        <h1>Stocks Dashboard</h1>

        <StocksList onePageList={this.props.onePageList} onePageListBeginNumbr={this.props.onePageListBeginNumbr} />

        <div className={classes.navButtonsWrap}>
          <Button placeholder='Prev' onClick={() => this.props.updateBeginNum( -10, this.props.onePageListBeginNumbr,  this.props.genList)} />
          <Button placeholder='Next' onClick={() => this.props.updateBeginNum( 10, this.props.onePageListBeginNumbr, this.props.genList)} />
        </div>
      </div>
      </DragDropContext>
    );
  }
}


function mapStateToProps(state) {
  return {
    genList:state.genList,
    onePageList: state.onePageList,
    onePageListBeginNumbr: state.onePageListBeginNumbr
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchList: () => dispatch(fetchList()),
    createOnePageList: () => dispatch(createOnePageList()),
    onDragEnd: newPageList => dispatch({type: 'ON_DRAG_END', onePageList: newPageList}),
    updateBeginNum: (beginNum, onePageListBeginNumbr,genList) => dispatch(updateBeginNumber(beginNum, onePageListBeginNumbr, genList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
