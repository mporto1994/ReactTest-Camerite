import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil,faArrowLeft,faPlay,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"

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
    const [respData, setRespData] = useState<Camera[]>([])
    
    
    const loadData = async () => {
        const response = await fetch("http://localhost:5000/cameras", {method: "GET"}) 
        const respDataResponse = await response.json()
        setRespData(respDataResponse)
    }

    const deleteCamera = async (id:number) => {
        const response = await fetch(`http://localhost:5000/cameras/${id}`, {method: "DELETE"}) 
        loadData()
    }


    useEffect(()=>{loadData()},[])
    
    return (
        <>  
            <Header>
            <FontAwesomeIcon onClick={()=>{navigation.navigate("CameraForm")}} icon={faPlusCircle} color="white" size='1x' />
            </Header>
            <View style={styles.container}>
                {respData.map((data) => (
                    <div className='card'>

                        <img src={data.image_url} alt="camera" />
                        <div className='cardHeader'>
                            <FontAwesomeIcon icon={faPencil} color="orange" size='1x' />
                            <p>{data.title}</p>
                            <FontAwesomeIcon onClick={()=>{deleteCamera(data.id)}} cursor="pointer" icon={faTrashCan} color="red" size='1x' />
                        </div>
                    </div>
                )) }
            </View>
        </>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete: {
 
    }
});

