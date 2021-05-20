import React from 'react'
import close from '../static/img/close.png'
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import {changeColorAC, addNewColorAC, toggleIsChangeAC,deleteColorAC} from '../redux'

const MSTP = (state)=>{
    return {
        palette: state.palette
    }
}

const PalettePageContainer = connect(MSTP, {deleteColorAC,changeColorAC, addNewColorAC, toggleIsChangeAC})(PalettePage)
export default PalettePageContainer





function PalettePage(props) {
    
    return (<>
        <div className="palletContainer">
            <div className="pallet">
            {
                props.palette.map(p =><div key={p.id}>
                <div  className="colorBlock" onClick={()=>{props.toggleIsChangeAC(p.id, true)}} style={{ backgroundColor: `${p.color}` }}>
                    <img alt="close" onClick={()=>{props.deleteColorAC(p.id)}} className="closeBtn" src={close}/>
                    </div>
                    {!p.isChange ||
                    <div>
                    <div className="colorPickerBackSide" onClick={()=>{props.toggleIsChangeAC(p.id, false)}}>
                    </div><div className="colorPicker" ><ChromePicker
                        color={p.color}  onChange={(e)=> props.changeColorAC(p.id, e.hex)} /></div></div>}
                </div>
                
                )
            }
                
                
            </div>
            
        </div>
        <div>
                <button htmlFor="colorPicker" onClick={()=>{props.addNewColorAC()}} className="btn">Выбрать цвет</button>
        </div>
    </>
    )
}
