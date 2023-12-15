import { useGLTF, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TVModel(props) {
    const { nodes } = useGLTF("/models/tv.glb");
    const videoTexture = useVideoTexture("/video.mp4");
    videoTexture.minFilter = THREE.LinearFilter;

    return (
        <mesh {...props} geometry={nodes.Screen.geometry}>
            <meshBasicMaterial map={videoTexture} />
        </mesh>
    );
}
