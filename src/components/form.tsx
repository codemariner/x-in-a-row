import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/types'
import { initializeBoard } from '../store/actions'

interface BoardFormProps {
	rows:number
	columns:number
	winningLength:number
	initializeBoard?:typeof initializeBoard
}

const BoardForm = ({
  rows,
  columns,
  winningLength,
  initializeBoard
}:BoardFormProps) => {
  const onSubmit = (evt:any) => {
    const inputs:HTMLCollection = evt.target.form.getElementsByTagName('input')
    const values:any = {}
    for (let i = 0; i < inputs.length; i++) {
      const input = (inputs[i] as HTMLInputElement)
      values[input.name] = parseInt(input.value)
    }
    initializeBoard(values.rows, values.columns, values.winningLength)
  }

  return (
    <div className='board-form'>
      <form id='newBoardForm'>
        <div className='row'>
			<label>Rows: </label>
          <input type='number' name='rows' defaultValue={`${rows}`} />
        </div>
        <div className='row'>
			<label>Columns:</label>
          <input type='number' name='columns' defaultValue={`${columns}`} />
        </div>
        <div className='row'>
			<label>How many in a row to win:</label>
          <input type='number' name='winningLength' defaultValue={`${winningLength}`} />
        </div>
        <div className='row'>
        	<button type='button' name='submit' value='create' onClick={onSubmit}>Create</button>
		</div>
      </form>
    </div>
  )
}

const mapStateToProps = ({ rows, columns, winningLength }:AppState):BoardFormProps => ({
  rows,
  columns,
  winningLength
})

export default connect(
  mapStateToProps,
  { initializeBoard }
)(BoardForm)
