import React from 'react'
import IconA from '@material-ui/icons/Clear'
import IconB from '@material-ui/icons/PanoramaFishEye'
import { CellValue } from "../store/types";

export interface PlayerIconProps {
	player?: CellValue,
	style?: object
}

const iconStyle = {
	height: '100%',
	width: '100%'
}

const PlayerIcon:React.FC<PlayerIconProps> = ({style, player}) => (
	player ?
		(player === 'X' ? <IconA style={style || iconStyle} /> : <IconB style={style || iconStyle} />) :
		null
)

export default PlayerIcon