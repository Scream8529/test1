import React, { useState } from 'react'
import axios from 'axios'
import uploadPhoto from '../static/img/uploadPhoto.png'

export default function FormPage() {
    const [drag, setDrag] = useState(false)
    const [img, setImg] = useState({ file: '', fileUrl: '' })
    const [form, setForm] = useState({name: '', surname:'',patronymic:'', res:""})


    const inputHandler = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const drugStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }
    const drugLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }
    const setImgToState =(file)=>{
        let fileReader = new FileReader()
        fileReader.onloadend = () => {
            setImg({ file: file, fileUrl: fileReader.result })
        }
        fileReader.readAsDataURL(file)
        setDrag(false)
    }
    const validatorImg =(file)=>{
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(file.name)) {
            alert('Пожалуйста выбирете изображение');
            setImg({ file: '', fileUrl: '' })
            return false;
        } 
        else return true
    }
    const drugDrop = (e) => {
        e.preventDefault()
        let file = [...e.dataTransfer.files]
        if (file.length > 1) {
            alert('Не более одного файла')
            return setDrag(false)
        }
        if (validatorImg(file[0])){
            setImgToState(file[0])
        } else setDrag(false)
        
    }
    const changeImgHandler = (e)=>{
        let file = [...e.target.files]
        if (file.length > 1) {
            alert('Не более одного файла')
            return setDrag(false)
        }
        if (validatorImg(file[0])){
            setImgToState(file[0])
        } else setDrag(false)
    }
    const sendData = () => {
        if (!img.file)
        {
            return alert("Сначала выберете фотографию.")
        }
        let form = new FormData()
        form.append('action', 'send_data')
        form.append('id', 1)
        form.append('image', img.file)
        form.append('contact', [String(form.name), String(form.surname), String(form.patronymic)])
        axios.post('https://test-job.pixli.app/send.php', form)
        .then(response =>{
            if (response.data.status === "success"){
                setForm({name: '', surname:'',patronymic:''})
            }
            let resp = JSON.stringify(response.data)
            setForm({...form, res: resp});
    })
    } 
    return (
        <div>
            <div className="inputBox">
                <div>
                    <p>Имя</p>
                </div>
                <input onChange={(e)=>{inputHandler(e)}} name="name" type="text" />
            </div>
            <div className="inputBox">
                <div>
                    <p>Фамилия</p>
                </div>
                <input  onChange={(e)=>{inputHandler(e)}} name="surname" type="text" />
            </div>
            <div className="inputBox">
                <div>
                    <p>Отчество</p>
                </div>
                <input  onChange={(e)=>{inputHandler(e)}} name="patronymic" type="text" />
            </div>
            <div className="inputBox">
                <div>
                    <p>Фото</p>
                </div>
                <input id="imgInput" className="picker" type="file" onChange={e=>{changeImgHandler(e)}} accept="image/png, image/jpeg" />
                <label htmlFor="imgInput" className="photoUploader"
                    onDragStart={e => { drugStartHandler(e) }}
                    onDragLeave={e => { drugLeaveHandler(e) }}
                    onDragOver={e => { drugStartHandler(e) }}
                    onDrop={e => { drugDrop(e) }}
                >
                    {drag
                        ? <div className="dragZone"></div>
                        : ((img.fileUrl)
                            ? <img alt="upload" src={img.fileUrl} className="uploadedPhoto" />
                            : <img alt="upload" src={uploadPhoto} className="upload"/>
                        )}
                    
                </label>
            </div>
            <div className="inputBox">
                <button onClick={sendData} className="btn">Сохранить</button>
            </div>
            <div className="inputBox">
                <div><p>Response</p></div>
                <div><textarea disabled value={form.res}/></div>
            </div>
        </div>
    )
}
