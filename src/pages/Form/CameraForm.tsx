import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil,faArrowLeft,faPlay,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/header';
import "./styles.css"
import { StyleSheet, Switch, Image, View, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'


interface CameraListProps {
    navigation: Navigation;
}

const CameraForm = ({navigation} : CameraListProps)=>{
    const [name, setName] = useState ("")
    const [plan, setPlan] = useState("")
    const [external, setExternal] = useState(false)

    const dropDownData = ["1dia" , "3dias" , "7dias"]
    
    const saveData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title:name,external:external,plan:plan })
        };
        if(name!=="" && plan!==""){
            const response = await fetch("http://localhost:5000/cameras", requestOptions) 
            const respDataResponse = await response.json()
            console.log(respDataResponse)
        }
        navigation.navigate("CameraList")
    }

    useEffect(()=>{
        
    },[])

    return(
        <>
            <Header>
                <FontAwesomeIcon onClick={() => navigation.goBack()} icon={faArrowLeft} color="white" size='2x' />
                <span className="spanSalvar" onClick={()=>saveData()} >Salvar</span>
            </Header>
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:"10px",
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

export default CameraForm