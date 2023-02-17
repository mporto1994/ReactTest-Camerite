import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil,faArrowLeft,faPlay,faPlusCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/header';
import "./styles.css"
// import {IoCloseSharp} from "@react-icons/all-files/io5/react-icons"
import { IoCloseSharp } from "react-icons/io5";
import { StyleSheet, Modal, Switch, Image, View, ImageBackground, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'


interface CameraListProps {
    navigation: Navigation;
}

const UpdateModal = ({modalVisible,setModalVisible,cameraToChange,setCameraToChange})=>{
    // const [modalVisible, setModalVisible] = useState (false)
    const [name, setName] = useState ("")
    const [plan, setPlan] = useState("")
    const [external, setExternal] = useState(false)

    const dropDownData = ["1dia" , "3dias" , "7dias"]
    
    const updateData = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title:name,external:external,plan:plan })
        };
        if(name!=="" && plan!==""){
            const response = await fetch(`http://localhost:5000/cameras/${cameraToChange}`, requestOptions) 
            const respDataResponse = await response.json()
            console.log(respDataResponse)
            setModalVisible(false)
        }
    }

    useEffect(()=>{
        
    },[])

    return(
        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
        >
            <View
                style={styles.modalView}
            >
                <View style={styles.viewHeader}>
                    <button onClick={()=>setModalVisible(false)}>
                        <IoCloseSharp/>
                    </button>
                </View>
                <View style={styles.container}>
                    <h3 className="labels nome">Nome da Câmera</h3>
                    <TextInput
                        className = "textInput"
                        value={name}
                        style = {styles.textInputStyle}
                        onChangeText={inputNome => setName(inputNome)}
                    />
                    <h3 className="labels plan">Plano de Gravação</h3>
                    <SelectDropdown
                        data={dropDownData}
                        onSelect={(selectedItem, index) => {
                            setPlan(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        rowStyle={styles.dropDownStyle}
                        buttonStyle={styles.dropDownStyle}
                        dropDownStyle={styles.dropDownStyle}
                    />
                    <View style = {styles.switchView}>
                        <h3 className="labels switch">Câmera Externa</h3>
                        <Switch
                            trackColor={{false: '#767577', true: '#6ab4aa'}}
                            thumbColor={external ? '#f4f3f4' : '#f4f3f4'}
                            onValueChange={()=>setExternal(!external)}
                            value={external}
                        />
                    </View>
                </View>   
                <button className="modalSalvar" onClick={()=>updateData()} >Salvar</button>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:"10px",
    },
    viewHeader:{
        backgroundColor: "#6897b6",
        height: "50px",
        width: "100%",
        display:"flex",
        justifyContent: "center",
        alignItems: "flex-end",
        fontSize:"30px",
        paddingRight: "15px",
        color: "#444",
        padding:"0 2%",
        
    },
    modal:{
        display: "flex",
        justifyContent:'center',
        alignContent:"center",
    },
    modalView:{
        width: "80%",
        backgroundColor:"white",
        border:"1px solid #888",


    },
    textInputStyle:{
        border: "1px solid #888",
        height:"40px",
        marginBottom:"10px",
    },
    switchView:{
        marginTop: "15px",
        display: "flex",
        flexDirection:"row",
        justifyContent:'space-between',
        alignContent:"center",
    },
    dropDownStyle:{
        backgroundColor:"red"
    },

    playIcon:{
        height:"100%",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    }
});

export default UpdateModal