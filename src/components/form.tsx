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
        <div>
					Rows:
          <input type='number' name='rows' defaultValue={`${rows}`} />
        </div>
        <div>
					Columns:
          <input type='number' name='columns' defaultValue={`${columns}`} />
        </div>
        <div>
					How many in a row to win:
          <input type='number' name='winningLength' defaultValue={`${winningLength}`} />
        </div>
        <button type='button' name='submit' value='create' onClick={onSubmit}>Create</button>
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
