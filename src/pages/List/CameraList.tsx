import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView,View, ImageBackground } from 'react-native';
import { Header } from '../../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil,faArrowLeft,faPlay,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"
import UpdateModal from '../../components/updateModal';

interface CameraListProps {
    navigation: Navigation;
}
interface Camera {
    "id": number,
    "title": string,
    "plan": string,
    "external": boolean,
    "image_url": string
}

export default function CameraList({ navigation }: CameraListProps) {
    const [cameraToChange, setCameraToChange] = useState(undefined) 
    const [respData, setRespData] = useState<Camera[]>([])
    const [modalVisible, setModalVisible] = useState (false)
    
    
    const loadData = async () => {
        const response = await fetch("http://localhost:5000/cameras", {method: "GET"}) 
        const respDataResponse = await response.json()
        setRespData(respDataResponse)
    }

    const deleteCamera = async (id:number) => {
        const response = await fetch(`http://localhost:5000/cameras/${id}`, {method: "DELETE"}) 
        loadData()
    }


    useEffect(()=>{loadData()},[modalVisible])
    
    return (
        <>  
            <UpdateModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                cameraToChange = {cameraToChange}
                setCameraToChange={setCameraToChange}
            />
            <Header>
            <FontAwesomeIcon  onClick={()=>{navigation.navigate("CameraForm")}} icon={faPlusCircle} color="white" size='1x' />
            </Header>
            <ScrollView>
                <View style={styles.container}>
                    {respData.map((data) => (
                        <div className='card'>
                            <ImageBackground source={data.image_url} style={styles.cameraImage}>
                                <View style={styles.playIcon}>
                                    <FontAwesomeIcon icon={faPlay} color="white" size='1x' />
                                </View>
                            </ImageBackground>
                            <div className='cardHeader'>
                                <FontAwesomeIcon onClick={()=>{setModalVisible(true),setCameraToChange(data.id)}} icon={faPencil} color="orange" size='1x' />
                                <p>{data.title}</p>
                                <FontAwesomeIcon onClick={()=>{deleteCamera(data.id)}} cursor="pointer" icon={faTrashCan} color="red" size='1x' />
                            </div>
                        </div>
                    )) }
                </View>

            </ScrollView>
        </>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:"15px",
        // justifyContent: 'center',
    },
    cameraImage:{
        height:"180px",
        width:"100%",
    },
    playIcon:{
        height:"100%",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    }
});

